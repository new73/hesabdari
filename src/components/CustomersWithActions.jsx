// src/components/CustomersWithActions.jsx
import React, { useEffect, useState } from "react";
import "./styles/Products.css"; // استایل مشابه محصولات

function CustomerForm({ customer, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    FullName: customer?.FullName || "",
    Email: customer?.Email || "",
    Phone: customer?.Phone || "",
    GroupId: customer?.GroupId || "",
    CreditRial: customer?.CreditRial || "",
    CreditLetter: customer?.CreditLetter || "",
    Address: customer?.Address || "",
    City: customer?.City || "",
    PostalCode: customer?.PostalCode || "",
    NationalCode: customer?.NationalCode || "",
    TaxCode: customer?.TaxCode || "",
    Mobile: customer?.Mobile || "",
    Description: customer?.Description || "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input name="FullName" value={formData.FullName} onChange={handleChange} placeholder="نام کامل" required />
      <input name="Email" value={formData.Email} onChange={handleChange} placeholder="ایمیل" />
      <input name="Phone" value={formData.Phone} onChange={handleChange} placeholder="تلفن" />
      <input name="GroupId" value={formData.GroupId} onChange={handleChange} placeholder="گروه" />
      <input name="CreditRial" value={formData.CreditRial} onChange={handleChange} placeholder="اعتبار ریالی" type="number" />
      <input name="CreditLetter" value={formData.CreditLetter} onChange={handleChange} placeholder="اعتبار نامه‌ای" type="number" />
      <input name="Address" value={formData.Address} onChange={handleChange} placeholder="آدرس" />
      <input name="City" value={formData.City} onChange={handleChange} placeholder="شهر" />
      <input name="PostalCode" value={formData.PostalCode} onChange={handleChange} placeholder="کد پستی" />
      <input name="NationalCode" value={formData.NationalCode} onChange={handleChange} placeholder="کد ملی" />
      <input name="TaxCode" value={formData.TaxCode} onChange={handleChange} placeholder="کد مالیاتی" />
      <input name="Mobile" value={formData.Mobile} onChange={handleChange} placeholder="موبایل" />
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

export default function CustomersWithActions() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null, name: "" });

  const notify = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/customers");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCustomers(data);
    } catch {
      notify("خطا در دریافت مشتریان", "error");
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const handleSave = async (formData) => {
    try {
      if (editingCustomer) {
        await fetch(`http://localhost:5000/api/customers/${editingCustomer.Id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        notify("مشتری ویرایش شد");
      } else {
        await fetch("http://localhost:5000/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        notify("مشتری افزوده شد");
      }
      setEditingCustomer(null);
      setShowForm(false);
      fetchCustomers();
    } catch {
      notify("خطا در ذخیره مشتری", "error");
    }
  };

  const requestDelete = (c) => setConfirm({ open: true, id: c.Id, name: c.FullName });

  const handleConfirmDelete = async () => {
    const id = confirm.id;
    try {
      await fetch(`http://localhost:5000/api/customers/${id}`, { method: "DELETE" });
      setCustomers((prev) => prev.filter((x) => x.Id !== id));
      notify("مشتری حذف شد");
    } catch {
      notify("خطا در حذف مشتری", "error");
    } finally {
      setConfirm({ open: false, id: null, name: "" });
    }
  };

  return (
    <div className="products-container">
      <h2>مدیریت مشتریان</h2>

      {!showForm && !editingCustomer && (
        <button className="btn-submit" onClick={() => setShowForm(true)}>
          + افزودن مشتری جدید
        </button>
      )}

      {(showForm || editingCustomer) && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingCustomer(null); }}
        />
      )}

      <table className="products-table">
        <thead>
          <tr>
            <th>نام کامل</th>
            <th>ایمیل</th>
            <th>تلفن</th>
            <th>گروه</th>
            <th>اعتبار ریالی</th>
            <th>اعتبار نامه‌ای</th>
            <th>آدرس</th>
            <th>شهر</th>
            <th>کد پستی</th>
            <th>کد ملی</th>
            <th>کد مالیاتی</th>
            <th>موبایل</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.Id}>
              <td>{c.FullName}</td>
              <td>{c.Email}</td>
              <td>{c.Phone}</td>
              <td>{c.GroupId}</td>
              <td>{c.CreditRial}</td>
              <td>{c.CreditLetter}</td>
              <td>{c.Address}</td>
              <td>{c.City}</td>
              <td>{c.PostalCode}</td>
              <td>{c.NationalCode}</td>
              <td>{c.TaxCode}</td>
              <td>{c.Mobile}</td>
              <td>{c.Description}</td>
              <td>
                <button className="btn-edit" onClick={() => setEditingCustomer(c)}>ویرایش</button>
                <button className="btn-delete" onClick={() => requestDelete(c)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {notification && <div className={`notification ${notification.type}`}>{notification.msg}</div>}

      <ConfirmDialog
        open={confirm.open}
        title="حذف مشتری"
        message={`آیا از حذف «${confirm.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirm({ open: false, id: null, name: "" })}
      />
    </div>
  );
}
