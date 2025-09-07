import React, { useEffect, useState } from "react";
import "./styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Server error while fetching products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>در حال بارگذاری محصولات...</p>;
  if (error) return <p>❌ خطا: {error}</p>;

  return (
    <div className="products-container">
      <h2>لیست محصولات</h2>
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>انبار</th>
              <th>دسته‌بندی</th>
              <th>توضیحات</th>
              <th>ایجاد شده</th>
              <th>به‌روزرسانی</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.Id}>
                <td>{p.Id}</td>
                <td>{p.ProductName}</td>
                <td>{p.Price.toLocaleString()} تومان</td>
                <td>{p.Stock}</td>
                <td>{p.WarehouseId}</td>
                <td>{p.CategoryId || "-"}</td>
                <td>{p.Description || "-"}</td>
                <td>{p.CreatedAt ? new Date(p.CreatedAt).toLocaleString() : "-"}</td>
                <td>{p.UpdatedAt ? new Date(p.UpdatedAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
