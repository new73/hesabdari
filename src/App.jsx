// src/App.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
// import Products معمولی رو حذف یا نذار
import ProductsWithActions from "./components/ProductsWithActions";
import Customers from "./components/Customers";
import Invoices from "./components/Invoices";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div
      className="app-container"
      style={{ display: "flex", direction: "rtl", minHeight: "100vh" }}
    >
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content" style={{ flex: 1, padding: "20px" }}>
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "products" && <ProductsWithActions />}
        {activePage === "customers" && <Customers />}
        {activePage === "invoices" && <Invoices />}
      </div>
    </div>
  );
}
