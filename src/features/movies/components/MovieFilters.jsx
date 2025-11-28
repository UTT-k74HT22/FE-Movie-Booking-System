/**
 * MovieFilters Component
 * Filter and sort controls for movie list
 */

import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from '@mui/material';
import { GridView, ViewList } from '@mui/icons-material';

const GENRES = [
  { value: '', label: 'All Genres' },
  { value: 'ACTION', label: 'Action' },
  { value: 'COMEDY', label: 'Comedy' },
  { value: 'DRAMA', label: 'Drama' },
  { value: 'HORROR', label: 'Horror' },
  { value: 'ROMANCE', label: 'Romance' },
  { value: 'SCI_FI', label: 'Sci-Fi' },
  { value: 'THRILLER', label: 'Thriller' },
  { value: 'ANIMATION', label: 'Animation' },
  { value: 'ADVENTURE', label: 'Adventure' },
  { value: 'FANTASY', label: 'Fantasy' },
];

const SORT_OPTIONS = [
  { value: 'releaseDate-desc', label: 'Newest First', sortBy: 'releaseDate', sortDir: 'desc' },
  { value: 'releaseDate-asc', label: 'Oldest First', sortBy: 'releaseDate', sortDir: 'asc' },
  { value: 'title-asc', label: 'Title (A-Z)', sortBy: 'title', sortDir: 'asc' },
  { value: 'title-desc', label: 'Title (Z-A)', sortBy: 'title', sortDir: 'desc' },
  { value: 'rating-desc', label: 'Highest Rated', sortBy: 'rating', sortDir: 'desc' },
  { value: 'rating-asc', label: 'Lowest Rated', sortBy: 'rating', sortDir: 'asc' },
];

const MovieFilters = ({ filters, onFilterChange, onSortChange, viewMode, onViewModeChange }) => {
  const handleStatusChange = (event, newStatus) => {
    if (newStatus !== null) {
      onFilterChange({ status: newStatus });
    }
  };

  const handleGenreChange = (event) => {
    onFilterChange({ genre: event.target.value });
  };

  const handleSortChange = (event) => {
    const selectedOption = SORT_OPTIONS.find(opt => opt.value === event.target.value);
    if (selectedOption) {
      onSortChange(selectedOption.sortBy, selectedOption.sortDir);
    }
  };

  const activeFiltersCount = [
    filters.status,
    filters.genre,
  ].filter(Boolean).length;

  return (
    <Box className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <Box className="flex flex-wrap items-center gap-4">
        {/* Status Filter */}
        <ToggleButtonGroup
          value={filters.status || ''}
          exclusive
          onChange={handleStatusChange}
          size="small"
        >
          <ToggleButton value="">
            All Movies
          </ToggleButton>
          <ToggleButton value="NOW_SHOWING">
            Now Showing
          </ToggleButton>
          <ToggleButton value="COMING_SOON">
            Coming Soon
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Genre Filter */}
        <FormControl size="small" className="min-w-[150px]">
          <InputLabel>Genre</InputLabel>
          <Select
            value={filters.genre || ''}
            label="Genre"
            onChange={handleGenreChange}
          >
            {GENRES.map((genre) => (
              <MenuItem key={genre.value} value={genre.value}>
                {genre.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl size="small" className="min-w-[180px]">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={`${filters.sortBy}-${filters.sortDir}`}
            label="Sort By"
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* View Mode Toggle */}
        {onViewModeChange && (
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => newMode && onViewModeChange(newMode)}
            size="small"
            className="ml-auto"
          >
            <ToggleButton value="grid">
              <GridView />
            </ToggleButton>
            <ToggleButton value="list">
              <ViewList />
            </ToggleButton>
          </ToggleButtonGroup>
        )}

        {/* Active Filters Badge */}
        {activeFiltersCount > 0 && (
          <Chip
            label={`${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active`}
            size="small"
            color="primary"
            onDelete={() => onFilterChange({ status: '', genre: '' })}
          />
        )}
      </Box>
    </Box>
  );
};

export default MovieFilters;
