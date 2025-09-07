import React from "react";
import "./styles/Sidebar.css";

export default function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar">
      <h2>منوی اصلی</h2>
      <ul>
        <li onClick={() => setActivePage("dashboard")}>داشبورد</li>
        <li onClick={() => setActivePage("products")}>محصولات</li>
        <li onClick={() => setActivePage("customers")}>مشتریان</li>
        <li onClick={() => setActivePage("invoices")}>فاکتورها</li>
      </ul>
    </div>
  );
}
