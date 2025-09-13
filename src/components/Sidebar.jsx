// src/components/Sidebar.jsx
import React from "react";
import "./components/styles/Styles.css";

export default function Sidebar({ setActivePage, activePage }) {
  const menuItems = [
    { key: "dashboard", label: "داشبورد" },
    { key: "products", label: "محصولات" },
    { key: "customers", label: "مشتریان" },
    { key: "invoices", label: "فاکتورها" },
  ];

  return (
    <div
      className="sidebar"
      style={{
        width: "200px",
        backgroundColor: "#2c3e50",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>مدیریت</h2>
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => setActivePage(item.key)}
          style={{
            backgroundColor: activePage === item.key ? "#34495e" : "transparent",
            color: "white",
            border: "none",
            padding: "10px",
            margin: "5px 0",
            cursor: "pointer",
            borderRadius: "5px",
            textAlign: "right",
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
