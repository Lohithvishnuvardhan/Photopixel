import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults, searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};