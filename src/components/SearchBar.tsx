import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Cameras', path: '/cameras', keywords: ['camera', 'dslr', 'mirrorless', 'canon', 'sony', 'nikon'] },
    { name: 'Lenses', path: '/lenses', keywords: ['lens', 'zoom', 'prime', 'wide', 'telephoto'] },
    { name: 'Accessories', path: '/accessories', keywords: ['tripod', 'flash', 'bag', 'strap', 'filter'] },
    { name: 'Batteries', path: '/batteries', keywords: ['battery', 'power', 'charger'] },
  ];

  const handleSearch = (term: string) => {
    const searchTermLower = term.toLowerCase();
    const matchedCategory = categories.find(category => 
      category.keywords.some(keyword => keyword.includes(searchTermLower)) ||
      category.name.toLowerCase().includes(searchTermLower)
    );

    if (matchedCategory) {
      navigate(matchedCategory.path);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          placeholder="Search products..."
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </form>

      {showSuggestions && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-50">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                navigate(category.path);
                setSearchTerm('');
                setShowSuggestions(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;