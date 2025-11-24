/**
 * Local Storage Utilities
 * Safe localStorage access with error handling
 */

import { safeJsonParse } from './helpers';

class LocalStorageService {
  /**
   * Set item to localStorage
   */
  setItem(key, value) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  /**
   * Get item from localStorage
   */
  getItem(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return defaultValue;
      
      // Try to parse as JSON, fallback to string
      return safeJsonParse(value, value);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  }

  /**
   * Remove item from localStorage
   */
  removeItem(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }

  /**
   * Clear all localStorage
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Check if key exists
   */
  hasItem(key) {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Get all keys
   */
  getAllKeys() {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }
}

export const localStorageService = new LocalStorageService();
export default localStorageService;
