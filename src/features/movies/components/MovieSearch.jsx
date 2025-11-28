/**
 * MovieSearch Component
 * Search bar with debounced input for movies
 */

import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useDebounce } from '../../../shared/hooks';

const MovieSearch = ({ onSearch, placeholder = 'Search movies...' }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: searchValue && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
      className="bg-white"
    />
  );
};

export default MovieSearch;
