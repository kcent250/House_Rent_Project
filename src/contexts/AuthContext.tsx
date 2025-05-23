import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode.react';

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [twoFactorSecret, setTwoFactorSecret] = useState<string | null>(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setupTwoFactor = async () => {
    const secret = speakeasy.generateSecret();
    setTwoFactorSecret(secret.base32);
    return secret.base32;
  };

  const verifyTwoFactor = (token: string, secret: string) => {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token
    });
  };

  const value = {
    user,
    loading,
    signIn: async (email: string, password: string, token?: string) => {
      if (token) {
        // Verify 2FA token before signing in
        const isValid = await verifyTwoFactor(token, user.user_metadata.twoFactorSecret);
        if (!isValid) {
          throw new Error('Invalid 2FA token');
        }
      }
      return supabase.auth.signInWithPassword({ email, password });
    },
    signUp: async (email: string, password: string, role: string = 'tenant') => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          }
        }
      });
      if (error) throw error;
      return data;
    },
    signOut: () => supabase.auth.signOut(),
    resetPassword: (email: string) => supabase.auth.resetPasswordForEmail(email),
    updatePassword: (newPassword: string) => supabase.auth.updateUser({ password: newPassword }),
    setupTwoFactor,
    verifyTwoFactor,
    twoFactorSecret
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};