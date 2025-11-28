/**
 * useSeatSelection Hook
 * Manages seat selection state and interactions
 */

import { useState, useEffect, useCallback } from 'react';
import { showtimeService } from '../../movies/services/showtime.service';
import { seatService } from '../services/seat.service';
import { toast } from 'react-toastify';

export const useSeatSelection = (showtimeId) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [heldSeats, setHeldSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showtime, setShowtime] = useState(null);

  /**
   * Fetch showtime and seats
   */
  const fetchSeatsAndShowtime = useCallback(async () => {
    if (!showtimeId) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch showtime details
      const showtimeData = await showtimeService.getShowtimeById(showtimeId);
      setShowtime(showtimeData.data || showtimeData);

      // Fetch seats by screen
      const screenId = showtimeData.data?.screen?.id || showtimeData.screen?.id;
      if (screenId) {
        const seatsData = await seatService.getSeatsByScreen(screenId);
        const seatsList = seatsData.data || seatsData.content || seatsData || [];
        
        // Sort seats by row and number
        const sortedSeats = seatsList.sort((a, b) => {
          if (a.rowLabel !== b.rowLabel) {
            return a.rowLabel.localeCompare(b.rowLabel);
          }
          return a.seatNumber - b.seatNumber;
        });
        
        setSeats(sortedSeats);
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to load seats';
      setError(message);
      console.error('Error fetching seats:', err);
    } finally {
      setLoading(false);
    }
  }, [showtimeId]);

  useEffect(() => {
    fetchSeatsAndShowtime();
  }, [fetchSeatsAndShowtime]);

  /**
   * Toggle seat selection
   */
  const toggleSeat = useCallback((seat) => {
    // Check if seat is available
    if (seat.status !== 'ACTIVE') {
      toast.warning('This seat is not available');
      return;
    }

    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seat.id);
      
      if (isSelected) {
        // Deselect
        return prev.filter((s) => s.id !== seat.id);
      } else {
        // Select (max 8 seats)
        if (prev.length >= 8) {
          toast.warning('You can select maximum 8 seats');
          return prev;
        }
        return [...prev, seat];
      }
    });
  }, []);

  /**
   * Hold selected seats
   */
  const holdSelectedSeats = useCallback(async () => {
    if (selectedSeats.length === 0) {
      toast.warning('Please select at least one seat');
      return false;
    }

    try {
      const seatIds = selectedSeats.map((s) => s.id);
      await seatService.holdSeats({
        showtimeId,
        seatIds,
        ttlSec: 600, // 10 minutes
      });

      setHeldSeats(selectedSeats);
      toast.success(`${selectedSeats.length} seat(s) held for 10 minutes`);
      return true;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to hold seats';
      toast.error(message);
      console.error('Error holding seats:', err);
      return false;
    }
  }, [selectedSeats, showtimeId]);

  /**
   * Release held seats
   */
  const releaseHeldSeats = useCallback(async () => {
    if (heldSeats.length === 0) return;

    try {
      const seatIds = heldSeats.map((s) => s.id);
      await seatService.releaseSeats({
        showtimeId,
        seatIds,
      });

      setHeldSeats([]);
      setSelectedSeats([]);
      toast.info('Seats released');
    } catch (err) {
      console.error('Error releasing seats:', err);
    }
  }, [heldSeats, showtimeId]);

  /**
   * Calculate total price
   */
  const totalPrice = selectedSeats.reduce((sum, seat) => {
    return sum + (seat.price || showtime?.price || 0);
  }, 0);

  /**
   * Clear selection
   */
  const clearSelection = () => {
    setSelectedSeats([]);
  };

  return {
    seats,
    selectedSeats,
    heldSeats,
    loading,
    error,
    showtime,
    totalPrice,
    toggleSeat,
    holdSelectedSeats,
    releaseHeldSeats,
    clearSelection,
    refetch: fetchSeatsAndShowtime,
  };
};

export default useSeatSelection;
