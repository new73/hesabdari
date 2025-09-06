import React, { useEffect, useState } from 'react';
import '../styles/Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="table-container">
      <h2>محصولات</h2>
      <table>
        <thead>
          <tr>
            <th>کد کالا</th>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>موجودی</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.Id}>
              <td>{p.Id}</td>
              <td>{p.ProductName}</td>
              <td>{p.Price.toLocaleString()} تومان</td>
              <td>{p.Stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
