/**
 * Admin Header Component
 */

import React from 'react';

const AdminHeader = () => {
  return (
    <header className="fixed top-0 left-[290px] right-0 bg-white text-[#344054] flex items-center justify-between px-6 font-bold text-[18px] border-b border-[#e0e0e0]">
      <div className="gap-5 flex items-center px-0 py-4 w-[587.4px]">
        <button className="flex items-center justify-center w-11 h-11 bg-none border border-gray-200 text-gray-500 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
            />
          </svg>
        </button>
        <div>Movie Booking Admin Panel</div>
      </div>
      <div className="gap-5 flex items-center py-4 px-0">
        {/* TODO: Add user menu, notifications */}
        <span className="text-sm">Admin</span>
      </div>
    </header>
  );
};

export default AdminHeader;
