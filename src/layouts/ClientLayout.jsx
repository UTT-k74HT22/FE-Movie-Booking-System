import React from "react";
import ClientHeader from "./ClientHeader";
import ClientFooter from "./ClientFooter";

export default function ClientLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#fff" }}>
      <ClientHeader />
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
      <ClientFooter />
    </div>
  );
}
