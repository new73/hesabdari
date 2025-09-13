// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CustomersWithActions from "./components/CustomersWithActions";
import ProductsWithActions from "./components/ProductsWithActions";
import Invoices from "./components/Invoices";
import "./components/styles/Styles.css";




export default function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* Sidebar */}
        <aside style={{
          width: '220px',
          backgroundColor: '#2c3e50',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          gap: '10px'
        }}>
          <h2 style={{textAlign: 'center'}}>داشبورد</h2>
          <NavLink 
            to="/dashboard" 
            className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            داشبورد
          </NavLink>
          <NavLink 
            to="/customers" 
            className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            مشتریان
          </NavLink>
          <NavLink 
            to="/products" 
            className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            محصولات
          </NavLink>
          <NavLink 
            to="/invoices" 
            className={({isActive}) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
            فاکتورها
          </NavLink>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f4f7fa' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersWithActions />} />
            <Route path="/products" element={<ProductsWithActions />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="*" element={<h2>صفحه یافت نشد</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
