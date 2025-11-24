/**
 * useLocalStorage Hook
 * Sync state with localStorage
 */

import { useState, useEffect } from 'react';
import { localStorageService } from '../utils';

export const useLocalStorage = (key, initialValue = null) => {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    return localStorageService.getItem(key, initialValue);
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      localStorageService.setItem(key, valueToStore);
    } catch (error) {
      console.error('Error setting localStorage value:', error);
    }
  };

  // Remove value from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      localStorageService.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage value:', error);
    }
  };

  // Listen to storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
