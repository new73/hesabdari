import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Customers from './components/Customers';
import Invoices from './components/Invoices';
import './styles/App.css';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'products': return <Products />;
      case 'customers': return <Customers />;
      case 'invoices': return <Invoices />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar setActivePage={setActivePage} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}
