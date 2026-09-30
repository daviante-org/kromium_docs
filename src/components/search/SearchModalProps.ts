import { SearchResult } from '../../types/SearchResult';

export interface SearchModalProps {
  isOpen: boolean;
  query: string;
  onQueryChange: (val: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  onClose: () => void;
  onSelect: (result: SearchResult) => void;
}
