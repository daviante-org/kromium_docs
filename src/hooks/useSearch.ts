import { useState, useEffect } from 'react';
import { SearchResult } from '../types/SearchResult';
import { searchService } from '../services/searchService';
import { useVersion } from './useVersion';

export function useSearch() {
  const { currentVersion } = useVersion();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const found = await searchService.search(query, currentVersion, 12);
        setResults(found);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [query, currentVersion]);

  const effectiveResults = query.trim() ? results : [];
  const effectiveIsSearching = query.trim() ? isSearching : false;

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    results: effectiveResults,
    isSearching: effectiveIsSearching,
    close: () => {
      setIsOpen(false);
      setQuery('');
      setResults([]);
    },
  };
}
