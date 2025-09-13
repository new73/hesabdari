// src/components/Products.jsx
import React, { useEffect, useState } from "react";
import "./components/styles/Styles.css";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    Price: "",
    Stock: "",
    WarehouseId: "",
    CategoryId: "",
    Description: "",
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        alert("خطا در دریافت محصولات");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          Price: parseFloat(newProduct.Price),
          Stock: parseInt(newProduct.Stock),
          WarehouseId: parseInt(newProduct.WarehouseId),
          CategoryId: newProduct.CategoryId ? parseInt(newProduct.CategoryId) : null,
        }),
      });
      const saved = await res.json();
      setProducts(prev => [...prev, saved]);
      setNewProduct({
        ProductName: "",
        Price: "",
        Stock: "",
        WarehouseId: "",
        CategoryId: "",
        Description: "",
      });
      setShowForm(false); // فرم بعد از ثبت بسته شود
    } catch (err) {
      console.error(err);
      alert("خطا در ثبت محصول");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("آیا مطمئن هستید می‌خواهید حذف کنید؟")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setProducts(prev => prev.filter(p => p.Id !== id));
    } catch {
      alert("خطا در حذف محصول!");
    }
  };

  return (
    <div className="products-container">
      <h2>محصولات</h2>

      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "بستن فرم" : "افزودن محصول جدید"}
      </button>

      {showForm && (
        <form className="add-product-form" onSubmit={handleSubmit}>
          <input name="ProductName" placeholder="نام محصول" value={newProduct.ProductName} onChange={handleChange} required />
          <input type="number" name="Price" placeholder="قیمت" value={newProduct.Price} onChange={handleChange} required />
          <input type="number" name="Stock" placeholder="موجودی" value={newProduct.Stock} onChange={handleChange} required />
          <input type="number" name="WarehouseId" placeholder="انبار" value={newProduct.WarehouseId} onChange={handleChange} required />
          <input type="number" name="CategoryId" placeholder="دسته‌بندی" value={newProduct.CategoryId} onChange={handleChange} />
          <textarea name="Description" placeholder="توضیحات" value={newProduct.Description} onChange={handleChange} />
          <button type="submit">ثبت محصول</button>
        </form>
      )}

      {loading ? <p>در حال بارگذاری...</p> : (
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
                <td>{p.CategoryId || "-"}</td>
                <td>{p.Description || "-"}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(p.Id)}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
