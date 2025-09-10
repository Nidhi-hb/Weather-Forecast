import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationRequest, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city..."
            disabled={loading}
            className="w-full pl-12 pr-32 py-4 text-lg rounded-2xl border border-white border-opacity-30 
                     bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white placeholder-opacity-70
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:bg-opacity-30
                     transition-all duration-300 disabled:opacity-50"
          />
          <Search 
            size={24} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70" 
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <button
              type="button"
              onClick={onLocationRequest}
              disabled={loading}
              className="p-2 rounded-xl bg-white bg-opacity-20 text-white hover:bg-opacity-30 
                       transition-all duration-300 disabled:opacity-50 group"
              title="Use current location"
            >
              <MapPin size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-2 rounded-xl bg-white bg-opacity-20 text-white hover:bg-opacity-30 
                       transition-all duration-300 disabled:opacity-50 font-medium"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;