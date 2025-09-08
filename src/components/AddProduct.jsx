import React, { useState } from "react";

export default function AddProduct({ onProductAdded }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      ProductName: productName,
      Price: parseFloat(price),
      Stock: parseInt(stock),
      WarehouseId: parseInt(warehouseId),
      CategoryId: categoryId ? parseInt(categoryId) : null,
      Description: description,
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("خطا در ثبت محصول");

      const savedProduct = await res.json();
      onProductAdded(savedProduct);

      // ریست فرم
      setProductName("");
      setPrice("");
      setStock("");
      setWarehouseId("");
      setCategoryId("");
      setDescription("");
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <input placeholder="نام محصول" value={productName} onChange={e => setProductName(e.target.value)} required />
      <input type="number" placeholder="قیمت" value={price} onChange={e => setPrice(e.target.value)} required />
      <input type="number" placeholder="موجودی" value={stock} onChange={e => setStock(e.target.value)} required />
      <input type="number" placeholder="انبار" value={warehouseId} onChange={e => setWarehouseId(e.target.value)} required />
      <input type="number" placeholder="دسته‌بندی" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
      <textarea placeholder="توضیحات" value={description} onChange={e => setDescription(e.target.value)} />

      <button type="submit">افزودن محصول</button>
    </form>
  );
}
