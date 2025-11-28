/**
 * SeatMap Component
 * Interactive cinema seat map with row labels
 */

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Seat from './Seat';

const SeatMap = ({ seats, selectedSeats, onSeatToggle, loading }) => {
  if (loading) {
    return (
      <Box className="text-center py-16">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <Typography className="text-gray-300">Loading seats...</Typography>
      </Box>
    );
  }

  if (seats.length === 0) {
    return (
      <Box className="text-center py-16">
        <Typography variant="h6" className="text-gray-400">
          No seats available
        </Typography>
      </Box>
    );
  }

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    const row = seat.rowLabel;
    if (!acc[row]) {
      acc[row] = [];
    }
    acc[row].push(seat);
    return acc;
  }, {});

  const rows = Object.keys(seatsByRow).sort();

  return (
    <Box className="w-full">
      {/* Screen */}
      <Box className="mb-12">
        <Paper 
          elevation={3}
          className="h-3 bg-gradient-to-b from-gray-300 to-gray-500 rounded-t-full mx-auto max-w-4xl relative"
        >
          <Box className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 px-6 py-2 rounded-full shadow-lg">
            <Typography variant="caption" className="text-gray-300 font-semibold">
              SCREEN
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Seat Grid */}
      <Box className="flex flex-col items-center space-y-2 mt-16">
        {rows.map((row) => (
          <Box key={row} className="flex items-center">
            {/* Row Label */}
            <Typography 
              variant="body2" 
              className="w-8 text-center font-bold text-gray-400 mr-4"
            >
              {row}
            </Typography>

            {/* Seats in Row */}
            <Box className="flex">
              {seatsByRow[row].map((seat) => (
                <Seat
                  key={seat.id}
                  seat={seat}
                  isSelected={selectedSeats.some((s) => s.id === seat.id)}
                  onToggle={onSeatToggle}
                />
              ))}
            </Box>

            {/* Row Label (Right) */}
            <Typography 
              variant="body2" 
              className="w-8 text-center font-bold text-gray-400 ml-4"
            >
              {row}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Legend */}
      <Box className="flex flex-wrap justify-center gap-6 mt-12 p-6 bg-gray-800/30 rounded-lg">
        <Box className="flex items-center gap-2">
          <Box className="w-8 h-8 bg-blue-500 rounded-lg"></Box>
          <Typography variant="body2" className="text-gray-300">Normal</Typography>
        </Box>
        <Box className="flex items-center gap-2">
          <Box className="w-8 h-8 bg-yellow-500 rounded-lg"></Box>
          <Typography variant="body2" className="text-gray-300">VIP</Typography>
        </Box>
        <Box className="flex items-center gap-2">
          <Box className="w-8 h-8 bg-rose-500 rounded-lg"></Box>
          <Typography variant="body2" className="text-gray-300">Couple</Typography>
        </Box>
        <Box className="flex items-center gap-2">
          <Box className="w-8 h-8 bg-gray-600 rounded-lg"></Box>
          <Typography variant="body2" className="text-gray-300">Booked</Typography>
        </Box>
        <Box className="flex items-center gap-2">
          <Box className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg"></Box>
          <Typography variant="body2" className="text-gray-300">Selected</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SeatMap;
