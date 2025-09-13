import React, { useState } from "react";
import "./styles/Styles.css";

export default function ProductForm({ product, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    ProductName: product?.ProductName || "",
    Price: product?.Price || 0,
    Stock: product?.Stock || 0,
    WarehouseId: product?.WarehouseId || "",
    CategoryId: product?.CategoryId || "",
    Description: product?.Description || ""
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = product ? "PUT" : "POST";
      const url = product
        ? `http://localhost:5000/api/products/${product.Id}`
        : "http://localhost:5000/api/products";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("خطا در ذخیره محصول");
      const data = await res.json();
      onSave({ ...formData, Id: product?.Id || data.Id });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="product-form-overlay">
      <form className="product-form" onSubmit={handleSubmit}>
        <h3>{product ? "ویرایش محصول" : "افزودن محصول جدید"}</h3>
        <label>نام محصول</label>
        <input name="ProductName" value={formData.ProductName} onChange={handleChange} required />

        <label>قیمت</label>
        <input name="Price" type="number" value={formData.Price} onChange={handleChange} required />

        <label>موجودی</label>
        <input name="Stock" type="number" value={formData.Stock} onChange={handleChange} required />

        <label>انبار</label>
        <input name="WarehouseId" value={formData.WarehouseId} onChange={handleChange} required />

        <label>دسته‌بندی</label>
        <input name="CategoryId" value={formData.CategoryId} onChange={handleChange} />

        <label>توضیحات</label>
        <input name="Description" value={formData.Description} onChange={handleChange} />

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button type="submit">ذخیره</button>
          <button type="button" onClick={onCancel}>انصراف</button>
        </div>
      </form>
    </div>
  );
}
