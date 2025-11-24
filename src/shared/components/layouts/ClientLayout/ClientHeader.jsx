/**
 * ClientHeader Component
 * Modern header with search and user menu
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants';
import { useAuth } from '../../../../features/auth';

const ClientHeader = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.MOVIES}?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate(ROUTES.HOME);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CineMax</h1>
              <p className="text-xs text-purple-200">Book Your Experience</p>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, genres, actors..."
                className="w-full px-6 py-3 pr-12 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-purple-200 border border-purple-300/30 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to={ROUTES.HOME}
              className="hidden lg:block text-white hover:text-pink-400 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to={ROUTES.MOVIES}
              className="hidden lg:block text-white hover:text-pink-400 font-medium transition-colors"
            >
              Movies
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.MY_BOOKINGS}
                  className="hidden lg:block text-white hover:text-pink-400 font-medium transition-colors"
                >
                  My Bookings
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to={ROUTES.MY_BOOKINGS}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        📋 My Bookings
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        👤 Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to={ROUTES.LOGIN}
                  className="px-6 py-2 text-white hover:text-pink-400 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 font-medium shadow-lg transform hover:scale-105 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
