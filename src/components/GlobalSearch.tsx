import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const searchData = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      const [propertiesRes, tenantsRes, paymentsRes] = await Promise.all([
        supabase
          .from('properties')
          .select('*')
          .or(`address.ilike.%${query}%, description.ilike.%${query}%`)
          .limit(5),
        supabase
          .from('tenants')
          .select('*')
          .or(`name.ilike.%${query}%, email.ilike.%${query}%`)
          .limit(5),
        supabase
          .from('payments')
          .select('*')
          .textSearch('description', query)
          .limit(5)
      ]);

      const combinedResults = [
        ...(propertiesRes.data || []).map(p => ({ ...p, type: 'property' })),
        ...(tenantsRes.data || []).map(t => ({ ...t, type: 'tenant' })),
        ...(paymentsRes.data || []).map(p => ({ ...p, type: 'payment' }))
      ];

      setResults(combinedResults);
    };

    const debounce = setTimeout(searchData, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleResultClick = (result: any) => {
    switch (result.type) {
      case 'property':
        navigate(`/properties/${result.id}`);
        break;
      case 'tenant':
        navigate(`/tenants/${result.id}`);
        break;
      case 'payment':
        navigate(`/payments/${result.id}`);
        break;
    }
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search everything..."
        className="w-96 px-4 py-2 border rounded-md"
      />
      
      {results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border rounded-md shadow-lg">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="text-xs text-gray-500 uppercase mr-2">
                  {result.type}
                </span>
                <span>
                  {result.type === 'property' ? result.address :
                   result.type === 'tenant' ? result.name :
                   `Payment #${result.id}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}