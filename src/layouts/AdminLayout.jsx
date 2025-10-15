import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f5f6fa" }}>
      <AdminHeader />
      <div style={{ display: "flex", flex: 1 }}>
        <AdminSidebar />
        <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      </div>
      <AdminFooter />
    </div>
  );
}
