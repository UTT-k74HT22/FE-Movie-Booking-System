/**
 * MovieCard Component
 * Displays a movie poster with basic information
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Rating } from '@mui/material';
import { CalendarMonth, LocalMovies } from '@mui/icons-material';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'NOW_SHOWING':
        return 'success';
      case 'COMING_SOON':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'NOW_SHOWING':
        return 'Now Showing';
      case 'COMING_SOON':
        return 'Coming Soon';
      default:
        return status;
    }
  };

  return (
    <Card
      className="movie-card h-full cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="400"
        image={movie.posterUrl || '/placeholder-movie.jpg'}
        alt={movie.title}
        className="h-[400px] object-cover"
      />
      <CardContent>
        <Box className="flex items-start justify-between mb-2">
          <Typography
            variant="h6"
            component="h3"
            className="font-bold line-clamp-2 flex-1"
          >
            {movie.title}
          </Typography>
          <Chip
            label={getStatusLabel(movie.status)}
            color={getStatusColor(movie.status)}
            size="small"
            className="ml-2"
          />
        </Box>

        {movie.rating && (
          <Box className="flex items-center gap-1 mb-2">
            <Rating
              value={movie.rating || 0}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              ({movie.rating?.toFixed(1)})
            </Typography>
          </Box>
        )}

        <Box className="flex items-center gap-2 text-gray-600 mb-1">
          <CalendarMonth fontSize="small" />
          <Typography variant="body2">
            {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}
          </Typography>
        </Box>

        <Box className="flex items-center gap-2 text-gray-600">
          <LocalMovies fontSize="small" />
          <Typography variant="body2">
            {movie.duration} min • {movie.genre}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
