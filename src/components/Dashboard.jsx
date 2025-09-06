import React from 'react';
import '../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="card">
        <h3>موجودی</h3>
        <p>120 قلم کالا</p>
      </div>
      <div className="card">
        <h3>فروش</h3>
        <p>45 میلیون تومان</p>
      </div>
      <div className="card">
        <h3>فاکتورها</h3>
        <p>23 فاکتور ثبت شده</p>
      </div>
    </div>
  );
}
