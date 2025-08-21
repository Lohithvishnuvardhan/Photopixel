import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  searchResults: any[];
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: any[]) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearch: () => set({ searchQuery: '', searchResults: [] }),
})); 