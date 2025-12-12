import React, { useState } from 'react';
import Input from '../common/Input';
import { useDocumentStore } from '../../stores/documentStore';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { setSearchQuery } = useDocumentStore();

  const handleChange = (value: string) => {
    setQuery(value);
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <Input
      type="search"
      placeholder="Search documents..."
      value={query}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full"
    />
  );
};

export default SearchBar;
