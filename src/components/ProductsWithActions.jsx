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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input name="ProductName" value={formData.ProductName} onChange={handleChange} placeholder="نام محصول" required />
      <input name="Price" value={formData.Price} onChange={handleChange} placeholder="قیمت" type="number" required />
      <input name="Stock" value={formData.Stock} onChange={handleChange} placeholder="موجودی" type="number" required />
      <input name="WarehouseId" value={formData.WarehouseId} onChange={handleChange} placeholder="انبار" />
      <input name="CategoryId" value={formData.CategoryId} onChange={handleChange} placeholder="دسته‌بندی" />
      <input name="Description" value={formData.Description} onChange={handleChange} placeholder="توضیحات" />

      <div className="form-actions">
        <button type="submit" className="btn-submit">ذخیره</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>انصراف</button>
      </div>
    </form>
  );
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmText = "بله، حذف کن", cancelText = "انصراف" }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-outline" onClick={onCancel}>{cancelText}</button>
          <button className="btn-danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsWithActions() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null, name: "" });

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProducts(data);
    } catch {
      notify("خطا در دریافت محصولات", "error");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        await fetch(`http://localhost:5000/api/products/${editingProduct.Id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        notify("محصول ویرایش شد");
      } else {
        await fetch("http://localhost:5000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        notify("محصول افزوده شد");
      }
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch {
      notify("خطا در ذخیره محصول", "error");
    }
  };

  const requestDelete = (p) => setConfirm({ open: true, id: p.Id, name: p.ProductName });

  const handleConfirmDelete = async () => {
    const id = confirm.id;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((x) => x.Id !== id));
      notify("محصول حذف شد");
    } catch {
      notify("خطا در حذف محصول", "error");
    } finally {
      setConfirm({ open: false, id: null, name: "" });
    }
  };

  return (
    <div className="products-container">
      <h2>مدیریت محصولات</h2>

      {!showForm && !editingProduct && (
        <button className="btn-submit" onClick={() => setShowForm(true)}>
          + افزودن محصول جدید
        </button>
      )}

      {(showForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}

      <table className="products-table">
        <thead>
          <tr>
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
              <td>{p.ProductName}</td>
              <td>{p.Price}</td>
              <td>{p.Stock}</td>
              <td>{p.WarehouseId}</td>
              <td>{p.CategoryId}</td>
              <td>{p.Description}</td>
              <td>
                <button className="btn-edit" onClick={() => setEditingProduct(p)}>ویرایش</button>
                <button className="btn-delete" onClick={() => requestDelete(p)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {notification && <div className={`notification ${notification.type}`}>{notification.msg}</div>}

      <ConfirmDialog
        open={confirm.open}
        title="حذف محصول"
        message={`آیا از حذف «${confirm.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirm({ open: false, id: null, name: "" })}
      />
    </div>
  );
}
