/**
 * Root App Component
 * Entry point for the application with providers
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './features/auth';
import AppRoutes from './core/routes';
import { appConfig } from './core/config/app.config';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer {...appConfig.toast} />
      </AuthProvider>
    </Router>
  );
}

export default App;
