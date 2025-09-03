// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';

// چون Electron اجازه دسترسی مستقیم Node.js به React رو میده، می‌تونیم DAL رو import کنیم
import { getProducts } from '../dal/db.js';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const data = await getProducts();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>لیست محصولات</h1>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>نام محصول</th>
                        <th>قیمت</th>
                        <th>موجودی</th>
                        <th>انبار</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.Id}>
                            <td>{p.Id}</td>
                            <td>{p.ProductName}</td>
                            <td>{p.Price}</td>
                            <td>{p.Stock}</td>
                            <td>{p.WarehouseId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
