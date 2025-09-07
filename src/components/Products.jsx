import React, { useEffect, useState } from "react";
import "./styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Server error while fetching products", err));
  }, []);

  return (
    <div className="products-container">
      <h2>محصولات</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th>انبار</th>
            <th>دسته‌بندی</th>
            <th>توضیحات</th>
            <th>تاریخ ایجاد</th>
            <th>آخرین بروزرسانی</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.Id}>
              <td>{p.Id}</td>
              <td>{p.ProductName}</td>
              <td>{p.Price.toLocaleString()}</td>
              <td>{p.Stock}</td>
              <td>{p.WarehouseId}</td>
              <td>{p.CategoryId}</td>
              <td>{p.Description}</td>
              <td>{p.CreatedAt ? new Date(p.CreatedAt).toLocaleDateString() : ""}</td>
              <td>{p.UpdatedAt ? new Date(p.UpdatedAt).toLocaleDateString() : ""}</td>
              <td>
                <button className="edit-btn">ویرایش</button>
                <button className="delete-btn">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
