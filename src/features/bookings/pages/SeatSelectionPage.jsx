/**
 * SeatSelectionPage
 * Interactive seat selection for movie booking
 * Features:
 * - Visual seat map with row/column layout
 * - Real-time seat availability
 * - Multiple seat selection (max 8)
 * - Seat type pricing (Normal, VIP, Couple)
 * - 10-minute hold timer
 * - Summary panel with total price
 */

import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Alert,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  AccessTime,
  EventSeat,
  LocalMovies,
  LocationOn,
} from '@mui/icons-material';
import { useSeatSelection } from '../hooks/useSeatSelection';
import SeatMap from '../components/SeatMap';
import { toast } from 'react-toastify';

const SeatSelectionPage = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, showtime: passedShowtime } = location.state || {};

  const {
    seats,
    selectedSeats,
    loading,
    error,
    showtime,
    totalPrice,
    toggleSeat,
    holdSelectedSeats,
    clearSelection,
  } = useSeatSelection(showtimeId);

  // Use passed showtime or fetched showtime
  const currentShowtime = showtime || passedShowtime;

  useEffect(() => {
    if (!showtimeId) {
      toast.error('Invalid showtime');
      navigate('/movies');
    }
  }, [showtimeId, navigate]);

  const handleContinue = async () => {
    const success = await holdSelectedSeats();
    if (success) {
      // Navigate to booking confirmation
      navigate(`/booking/confirm`, {
        state: {
          movie,
          showtime: currentShowtime,
          selectedSeats,
          totalPrice,
        },
      });
    }
  };

  const handleBack = () => {
    if (movie) {
      navigate(`/movies/${movie.id}`);
    } else {
      navigate('/movies');
    }
  };

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
        <Button onClick={handleBack} startIcon={<ArrowBack />}>
          Back to Movies
        </Button>
      </Container>
    );
  }

  return (
    <Box className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <Container maxWidth="xl">
        {/* Header */}
        <Box className="mb-8">
          <Button
            onClick={handleBack}
            startIcon={<ArrowBack />}
            className="text-white mb-4"
          >
            Back
          </Button>

          <Typography variant="h3" className="text-white font-bold mb-2">
            Select Your Seats
          </Typography>

          {movie && currentShowtime && (
            <Box className="flex flex-wrap items-center gap-4 text-gray-300">
              <Box className="flex items-center gap-2">
                <LocalMovies />
                <Typography>{movie.title}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem className="bg-gray-600" />
              <Box className="flex items-center gap-2">
                <LocationOn />
                <Typography>{currentShowtime.theater?.name || 'Theater'}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem className="bg-gray-600" />
              <Box className="flex items-center gap-2">
                <AccessTime />
                <Typography>
                  {new Date(currentShowtime.startTime).toLocaleString('vi-VN', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Main Content */}
        <Box className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map - 3 columns */}
          <Box className="lg:col-span-3">
            <Paper className="p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <SeatMap
                seats={seats}
                selectedSeats={selectedSeats}
                onSeatToggle={toggleSeat}
                loading={loading}
              />
            </Paper>
          </Box>

          {/* Summary Panel - 1 column */}
          <Box className="lg:col-span-1">
            <Paper className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 sticky top-24">
              <Typography variant="h5" className="text-white font-bold mb-6">
                Booking Summary
              </Typography>

              {/* Selected Seats */}
              <Box className="mb-6">
                <Typography variant="subtitle2" className="text-gray-300 mb-3">
                  Selected Seats ({selectedSeats.length})
                </Typography>
                
                {selectedSeats.length > 0 ? (
                  <Box className="flex flex-wrap gap-2">
                    {selectedSeats.map((seat) => (
                      <Chip
                        key={seat.id}
                        label={`${seat.rowLabel}${seat.seatNumber}`}
                        onDelete={() => toggleSeat(seat)}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        size="small"
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" className="text-gray-400 italic">
                    No seats selected
                  </Typography>
                )}
              </Box>

              <Divider className="bg-gray-600 mb-6" />

              {/* Price Breakdown */}
              <Box className="space-y-3 mb-6">
                {selectedSeats.map((seat) => (
                  <Box key={seat.id} className="flex justify-between text-gray-300">
                    <Typography variant="body2">
                      {seat.rowLabel}{seat.seatNumber} ({seat.seatType})
                    </Typography>
                    <Typography variant="body2">
                      {(seat.price || currentShowtime?.price || 0).toLocaleString()} VND
                    </Typography>
                  </Box>
                ))}
              </Box>

              {selectedSeats.length > 0 && (
                <>
                  <Divider className="bg-gray-600 mb-4" />
                  
                  <Box className="flex justify-between items-center mb-6">
                    <Typography variant="h6" className="text-white font-bold">
                      Total
                    </Typography>
                    <Typography variant="h5" className="text-pink-400 font-bold">
                      {totalPrice.toLocaleString()} VND
                    </Typography>
                  </Box>
                </>
              )}

              {/* Action Buttons */}
              <Box className="space-y-3">
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleContinue}
                  disabled={selectedSeats.length === 0}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 disabled:from-gray-600 disabled:to-gray-700"
                  startIcon={<EventSeat />}
                >
                  Continue to Payment
                </Button>

                {selectedSeats.length > 0 && (
                  <Button
                    fullWidth
                    variant="outlined"
                    size="medium"
                    onClick={clearSelection}
                    className="border-gray-500 text-gray-300 hover:border-gray-400"
                  >
                    Clear Selection
                  </Button>
                )}
              </Box>

              {/* Info */}
              <Box className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Typography variant="caption" className="text-blue-300">
                  ⏱️ Seats will be held for 10 minutes after selection
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SeatSelectionPage;
