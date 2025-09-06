import React from 'react';
import '../styles/Invoices.css';

export default function Invoices() {
  const invoices = [
    { id: 1, customer: 'علی احمدی', total: 250000, date: '2025-09-01' },
    { id: 2, customer: 'سارا رضایی', total: 450000, date: '2025-09-03' },
    { id: 3, customer: 'محمد کریمی', total: 120000, date: '2025-09-05' },
  ];

  return (
    <div className="table-container">
      <h2>فاکتورها</h2>
      <table>
        <thead>
          <tr>
            <th>کد فاکتور</th>
            <th>مشتری</th>
            <th>مبلغ کل</th>
            <th>تاریخ</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customer}</td>
              <td>{inv.total.toLocaleString()} تومان</td>
              <td>{inv.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
