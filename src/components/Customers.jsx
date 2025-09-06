import React, { useEffect, useState } from 'react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (window.api?.getCustomers) {
      window.api.getCustomers().then(data => setCustomers(data));
    } else {
      console.warn('window.api undefined: running in browser without Electron');
      setCustomers([
        { Id: 1, Name: 'مشتری تست', Phone: '09120000000', Email: 'test@example.com' }
      ]);
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#34495e' }}>لیست مشتریان</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#27ae60', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>نام</th>
            <th style={{ padding: '10px' }}>تلفن</th>
            <th style={{ padding: '10px' }}>ایمیل</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.Id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{c.Id}</td>
              <td style={{ padding: '10px' }}>{c.Name}</td>
              <td style={{ padding: '10px' }}>{c.Phone}</td>
              <td style={{ padding: '10px' }}>{c.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
