import { SearchResult } from '../../types/SearchResult';

export interface SearchResultsListProps {
  results: SearchResult[];
  selectedIndex: number;
  onSelect: (result: SearchResult) => void;
}
