import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import GlobalSearch from './GlobalSearch';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center">
              <GlobalSearch />
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative ml-3">
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  {user?.email} ({user?.user_metadata?.role || 'tenant'})
                </span>
                <button
                  onClick={signOut}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}