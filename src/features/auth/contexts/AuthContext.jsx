/**
 * Auth Context
 * Global authentication state management
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';
import { tokenService } from '../../../shared/utils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      try {
        const token = tokenService.getAccessToken();
        
        if (token && !tokenService.isTokenExpired(token)) {
          const userData = tokenService.getUserFromToken();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          tokenService.clearTokens();
        }
      } catch (error) {
        console.error('Init auth error:', error);
        tokenService.clearTokens();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  /**
   * Login
   */
  const login = useCallback(async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const userData = response.user;
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  /**
   * Register
   */
  const register = useCallback(async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * Refresh user data
   */
  const refreshUser = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  }, []);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback((role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  }, [user]);

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = useCallback((roles) => {
    if (!user || !user.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }, [user]);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshUser,
    hasRole,
    hasAnyRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Hook
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
