import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-[290px] min-h-screen">
        <AdminHeader />
        <div className="mt-[76px] flex-1 bg-gray-100 p-6 pb-20 overflow-auto">{children}
        </div>
        <AdminFooter />
      </div>
    </div>
  );
}
