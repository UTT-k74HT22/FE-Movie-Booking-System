import React from "react";

export default function AdminSidebar() {
  return (
    <aside style={{ background: "#333", color: "#fff", width: "220px", minHeight: "calc(100vh - 60px)", padding: "2rem 1rem", boxSizing: "border-box" }}>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/admin/dashboard" style={{ color: "#fff" }}>Dashboard</a></li>
          <li><a href="/admin/movies" style={{ color: "#fff" }}>Movies</a></li>
          <li><a href="/admin/bookings" style={{ color: "#fff" }}>Bookings</a></li>
          <li><a href="/admin/users" style={{ color: "#fff" }}>Users</a></li>
        </ul>
      </nav>
    </aside>
  );
}
