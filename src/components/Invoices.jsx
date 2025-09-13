// src/components/Invoices.jsx
import React, { useEffect, useState } from "react";
import "./styles/Styles.css";


const toPersianDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("fa-IR");
};

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/invoices");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setInvoices(data);
    } catch {
      // اگر سرور آماده نیست از داده نمونه استفاده می‌کنیم
      setInvoices([
        { id: 1, customer: 'علی احمدی', total: 250000, date: '2025-09-01' },
        { id: 2, customer: 'سارا رضایی', total: 450000, date: '2025-09-03' },
        { id: 3, customer: 'محمد کریمی', total: 120000, date: '2025-09-05' },
      ]);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

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
              <td>{toPersianDate(inv.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
