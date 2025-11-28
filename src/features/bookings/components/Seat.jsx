/**
 * Seat Component
 * Individual seat display with interactive selection
 */

import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { EventSeat } from '@mui/icons-material';

const Seat = ({ seat, isSelected, onToggle, disabled = false }) => {
  const getSeatColor = () => {
    if (disabled || seat.status !== 'ACTIVE') {
      return 'bg-gray-600 cursor-not-allowed';
    }
    if (isSelected) {
      return 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg scale-110';
    }
    
    // Color by type
    switch (seat.seatType) {
      case 'VIP':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'COUPLE':
        return 'bg-rose-500 hover:bg-rose-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  const handleClick = () => {
    if (!disabled && seat.status === 'ACTIVE') {
      onToggle(seat);
    }
  };

  return (
    <Tooltip 
      title={`${seat.rowLabel}${seat.seatNumber} - ${seat.seatType} ${
        seat.status !== 'ACTIVE' ? '(Booked)' : ''
      }`}
      arrow
    >
      <Box
        onClick={handleClick}
        className={`
          w-10 h-10 m-1 rounded-lg flex items-center justify-center
          cursor-pointer transition-all duration-200 transform
          ${getSeatColor()}
          ${!disabled && seat.status === 'ACTIVE' ? 'hover:scale-110' : ''}
        `}
      >
        <EventSeat 
          fontSize="small" 
          className={`${
            seat.status !== 'ACTIVE' ? 'opacity-40' : ''
          }`}
        />
      </Box>
    </Tooltip>
  );
};

export default Seat;
