/**
 * Forgot Password Page
 */

import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center text-gray-600">
          {/* TODO: Migrate from old src/components/Auth/ForgotPassword/ForgotPassword.jsx */}
          Forgot password form goes here
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
