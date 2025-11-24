/**
 * ClientHeader Component
 * Clean, professional header inspired by Beta Cinemas
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.MOVIES}?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate(ROUTES.HOME);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 shadow-lg">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">CineMax</span>
              <span className="text-xs text-pink-100 -mt-1">Book Your Experience</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, genres, actors..."
                className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-pink-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-pink-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to={ROUTES.HOME}
              className="text-white hover:text-pink-200 font-medium text-sm uppercase tracking-wide transition-colors"
            >
              Home
            </Link>
            <Link
              to={ROUTES.MOVIES}
              className="text-white hover:text-pink-200 font-medium text-sm uppercase tracking-wide transition-colors"
            >
              Movies
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.MY_BOOKINGS}
                  className="text-white hover:text-pink-200 font-medium text-sm uppercase tracking-wide transition-colors"
                >
                  My Bookings
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-xs">
                        {user?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-white text-sm font-medium">{user?.firstName || 'User'}</span>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl overflow-hidden z-50">
                      <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                        <p className="text-sm font-bold text-gray-800">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                      </div>
                      <Link
                        to={ROUTES.MY_BOOKINGS}
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg className="w-4 h-4 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Bookings
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg className="w-4 h-4 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to={ROUTES.LOGIN}
                  className="px-5 py-2 text-white hover:bg-white/20 rounded-lg font-medium text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="px-5 py-2 bg-white text-purple-600 rounded-lg hover:bg-pink-50 font-semibold text-sm shadow-md transform hover:scale-105 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-purple-800 border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 text-white placeholder-pink-100 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <Link
              to={ROUTES.HOME}
              className="block py-2 text-white hover:text-pink-200 font-medium transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              to={ROUTES.MOVIES}
              className="block py-2 text-white hover:text-pink-200 font-medium transition-colors"
              onClick={() => setShowMobileMenu(false)}
            >
              Movies
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.MY_BOOKINGS}
                  className="block py-2 text-white hover:text-pink-200 font-medium transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 text-white hover:text-pink-200 font-medium transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowMobileMenu(false);
                  }}
                  className="block w-full text-left py-2 text-red-200 hover:text-red-100 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="block py-2 text-white hover:text-pink-200 font-medium transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Login
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="block py-2 px-4 bg-white text-purple-600 rounded-lg font-semibold text-center transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default ClientHeader;
