import React, { useEffect, useState } from 'react';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (window.api?.getInvoices) {
      window.api.getInvoices().then(data => setInvoices(data));
    } else {
      console.warn('window.api undefined: running in browser without Electron');
      setInvoices([
        { Id: 1, Customer: 'مشتری تست', Date: '2025-09-06', Total: 50000 }
      ]);
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#34495e' }}>لیست فاکتورها</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#8e44ad', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>مشتری</th>
            <th style={{ padding: '10px' }}>تاریخ</th>
            <th style={{ padding: '10px' }}>جمع کل</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.Id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{inv.Id}</td>
              <td style={{ padding: '10px' }}>{inv.Customer}</td>
              <td style={{ padding: '10px' }}>{inv.Date}</td>
              <td style={{ padding: '10px' }}>{inv.Total.toLocaleString()} تومان</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
