/**
 * Admin Layout Component
 * Main layout for admin pages with sidebar
 */

import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col ml-[290px]">
        <AdminHeader />
        
        <main className="flex-1 mt-[76px] p-6 pb-20 overflow-auto">
          {children}
        </main>
        
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
