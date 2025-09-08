// src/components/ProductsWithActions.jsx
import React, { useEffect, useState } from "react";

export default function ProductsWithActions() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Server error while fetching products:", err);
      alert("خطا در دریافت محصولات از سرور!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا مطمئن هستید می‌خواهید حذف کنید؟")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.Id !== id));
    } catch (err) {
      console.error(err);
      alert("خطا در حذف محصول!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <h2>محصولات با عملیات</h2>
      {loading ? (
        <p>در حال بارگذاری محصولات...</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>انبار</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.Id}>
                <td>{p.Id}</td>
                <td>{p.ProductName}</td>
                <td>{p.Price.toLocaleString()}</td>
                <td>{p.Stock}</td>
                <td>{p.WarehouseId}</td>
                <td>
                  <button onClick={() => alert("اینجا فرم ویرایش می‌آید")}>
                    ویرایش
                  </button>
                  <button onClick={() => handleDelete(p.Id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
