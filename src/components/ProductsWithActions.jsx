import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import "./styles/Products.css";

export default function ProductsWithActions() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("خطا در دریافت محصولات");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleProductAdded = (newProduct) => setProducts(prev => [...prev, newProduct]);

  const handleDelete = async (id) => {
    if (!window.confirm("آیا مطمئن هستید می‌خواهید حذف کنید؟")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("خطا در حذف محصول");
      setProducts(prev => prev.filter(p => p.Id !== id));
    } catch (err) {
      console.error(err);
      alert("خطا در حذف محصول!");
    }
  };

  return (
    <div className="products-page">
      <h2>محصولات</h2>

      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "بستن فرم افزودن محصول" : "افزودن محصول جدید"}
      </button>

      {showAddForm && <AddProduct onProductAdded={handleProductAdded} />}

      {loading ? <p>در حال بارگذاری محصولات...</p> : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>انبار</th>
              <th>تاریخ ایجاد</th>
              <th>تاریخ بروزرسانی</th>
              <th>دسته‌بندی</th>
              <th>توضیحات</th>
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
                <td>{p.CreatedAt?.split("T")[0] || "-"}</td>
                <td>{p.UpdatedAt?.split("T")[0] || "-"}</td>
                <td>{p.CategoryId || "-"}</td>
                <td>{p.Description || "-"}</td>
                <td>
                  <button onClick={() => alert("اینجا فرم ویرایش می‌آید")}>ویرایش</button>
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
