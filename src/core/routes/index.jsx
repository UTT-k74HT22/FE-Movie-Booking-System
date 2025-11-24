/**
 * Routes Index
 * Main routing configuration with lazy loading support
 */

import React, { Suspense, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, protectedRoutes, notFoundRoute } from './routeConfig';
import ProtectedRoute from './ProtectedRoute';

/**
 * Loading Fallback Component
 */
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-lg">Loading...</div>
  </div>
);

/**
 * App Routes Component
 */
const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route, index) => {
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={`public-${index}`}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}

        {/* Protected Routes */}
        {protectedRoutes.map((route, index) => {
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={`protected-${index}`}
              path={route.path}
              element={
                <ProtectedRoute allowedRoles={route.allowedRoles}>
                  <Layout>
                    <Component />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}

        {/* 404 Not Found Route */}
        <Route
          path={notFoundRoute.path}
          element={
            <Suspense fallback={<LoadingFallback />}>
              <notFoundRoute.component />
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
