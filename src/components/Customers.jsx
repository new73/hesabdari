import React from 'react';
import './styles/Customers.css';

export default function Customers() {
  const customers = [
    { id: 1, name: 'علی احمدی', phone: '09120000001', email: 'ali@example.com' },
    { id: 2, name: 'سارا رضایی', phone: '09120000002', email: 'sara@example.com' },
    { id: 3, name: 'محمد کریمی', phone: '09120000003', email: 'mohammad@example.com' },
  ];

  return (
    <div className="table-container">
      <h2>مشتریان</h2>
      <table>
        <thead>
          <tr>
            <th>کد مشتری</th>
            <th>نام</th>
            <th>تلفن</th>
            <th>ایمیل</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
