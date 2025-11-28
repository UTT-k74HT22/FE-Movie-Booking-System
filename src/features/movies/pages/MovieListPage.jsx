/**
 * MovieListPage
 * Main page for browsing and searching movies
 * Features:
 * - Search movies with debounced input
 * - Filter by status (Now Showing, Coming Soon) and genre
 * - Sort by various criteria (date, title, rating)
 * - Pagination with page info
 * - Grid/List view toggle
 * - Responsive design
 */

import React, { useState } from 'react';
import { Container, Box, Typography, Pagination, Alert } from '@mui/material';
import { useMovies } from '../hooks/useMovies';
import { MovieSearch, MovieFilters, MovieGrid } from '../components';

const MovieListPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  
  const {
    movies,
    loading,
    error,
    pagination,
    filters,
    handlePageChange,
    handleFilterChange,
    handleSearch,
    handleSort,
  } = useMovies();

  return (
    <Container maxWidth="xl" className="py-8">
      {/* Header */}
      <Box className="mb-6">
        <Typography variant="h3" component="h1" className="font-bold mb-2">
          Movies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and book tickets for the latest movies
        </Typography>
      </Box>

      {/* Search */}
      <Box className="mb-4">
        <MovieSearch onSearch={handleSearch} />
      </Box>

      {/* Filters */}
      <MovieFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortChange={handleSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Movie Grid */}
      <MovieGrid movies={movies} loading={loading} viewMode={viewMode} />

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <Box className="flex justify-center mt-8">
          <Pagination
            count={pagination.totalPages}
            page={pagination.page + 1}
            onChange={(e, page) => handlePageChange(page - 1)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Results Info */}
      {!loading && movies.length > 0 && (
        <Box className="text-center mt-4">
          <Typography variant="body2" color="text.secondary">
            Showing {pagination.page * pagination.size + 1} -{' '}
            {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of{' '}
            {pagination.totalElements} movies
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default MovieListPage;
