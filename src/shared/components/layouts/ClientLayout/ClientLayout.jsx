/**
 * Client Layout Component
 * Main layout for client-facing pages
 */

import React from 'react';
import ClientHeader from './ClientHeader';
import ClientFooter from './ClientFooter';

const ClientLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ClientHeader />
      
      <main className="flex-1 p-8">
        {children}
      </main>
      
      <ClientFooter />
    </div>
  );
};

export default ClientLayout;
