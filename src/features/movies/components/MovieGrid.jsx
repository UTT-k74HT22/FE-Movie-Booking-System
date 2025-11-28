/**
 * MovieGrid Component
 * Responsive grid layout for movie cards with loading states
 */

import React from 'react';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading, viewMode = 'grid' }) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(12)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Skeleton variant="rectangular" height={400} className="rounded-lg" />
            <Skeleton variant="text" className="mt-2" />
            <Skeleton variant="text" width="60%" />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (movies.length === 0) {
    return (
      <Box className="text-center py-16">
        <Typography variant="h5" color="text.secondary" className="mb-2">
          No movies found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your filters or search query
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid
          item
          xs={12}
          sm={viewMode === 'grid' ? 6 : 12}
          md={viewMode === 'grid' ? 4 : 12}
          lg={viewMode === 'grid' ? 3 : 12}
          key={movie.id}
        >
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
