import React, { useEffect, useState } from "react";
import "./styles/ProductsWithActions.css";

function ProductForm({ product, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    ProductName: product?.ProductName || "",
    Price: product?.Price || "",
    Stock: product?.Stock || "",
    WarehouseId: product?.WarehouseId || "",
    CategoryId: product?.CategoryId || "",
    Description: product?.Description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <input name="ProductName" placeholder="نام محصول" value={formData.ProductName} onChange={handleChange} required />
        <input type="number" name="Price" placeholder="قیمت" value={formData.Price} onChange={handleChange} required />
        <input type="number" name="Stock" placeholder="موجودی" value={formData.Stock} onChange={handleChange} required />
        <input type="number" name="WarehouseId" placeholder="انبار" value={formData.WarehouseId} onChange={handleChange} required />
        <input type="number" name="CategoryId" placeholder="دسته‌بندی" value={formData.CategoryId} onChange={handleChange} />
        <textarea name="Description" placeholder="توضیحات" value={formData.Description} onChange={handleChange} />
        <div className="form-buttons">
          <button type="submit">ذخیره</button>
          <button type="button" onClick={onCancel}>انصراف</button>
        </div>
      </form>
    </div>
  );
}

export default function ProductsWithActions() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("آیا مطمئن هستید می‌خواهید حذف کنید؟")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("خطا در حذف محصول");
      setProducts((prev) => prev.filter((p) => p.Id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        const res = await fetch(`http://localhost:5000/api/products/${editingProduct.Id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("خطا در ویرایش محصول");
        setProducts((prev) =>
          prev.map((p) => (p.Id === editingProduct.Id ? { ...p, ...formData } : p))
        );
      } else {
        const res = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("خطا در افزودن محصول");
        const newProduct = await res.json();
        setProducts((prev) => [...prev, newProduct]);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  return (
    <div className="products-page">
      <h2>محصولات</h2>
      <button className="add-btn" onClick={() => { setEditingProduct(null); setShowForm(!showForm); }}>
        {showForm ? "بستن فرم" : "افزودن محصول"}
      </button>

      {showForm && <ProductForm product={editingProduct} onCancel={() => setShowForm(false)} onSave={handleSave} />}

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
                <td>{p.CategoryId || "-"}</td>
                <td>{p.Description || "-"}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(p)}>ویرایش</button>
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
