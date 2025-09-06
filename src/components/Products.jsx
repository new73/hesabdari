import React, { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (window.api?.getProducts) {
      window.api.getProducts().then(data => setProducts(data));
    } else {
      console.warn('window.api undefined: running in browser without Electron');
      setProducts([
        { Id: 1, ProductName: 'محصول تست', Price: 10000, Stock: 50 }
      ]);
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#34495e' }}>لیست محصولات</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#2980b9', color: 'white' }}>
          <tr>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>نام محصول</th>
            <th style={{ padding: '10px' }}>قیمت</th>
            <th style={{ padding: '10px' }}>موجودی</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.Id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{p.Id}</td>
              <td style={{ padding: '10px' }}>{p.ProductName}</td>
              <td style={{ padding: '10px' }}>{p.Price.toLocaleString()} تومان</td>
              <td style={{ padding: '10px' }}>{p.Stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
