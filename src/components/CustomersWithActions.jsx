// src/components/CustomersWithActions.jsx
import React, { useEffect, useState } from "react";
import "./styles/Styles.css";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { ipcRenderer } = window;

// تبدیل تاریخ میلادی به شمسی
const toPersianDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("fa-IR");
};

function CustomerForm({ customer, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    FullName: customer?.FullName || "",
    Email: customer?.Email || "",
    Phone: customer?.Phone || "",
    GroupId: customer?.GroupId || "",
    CreditRial: customer?.CreditRial || 0,
    CreditLetter: customer?.CreditLetter || 0,
    Address: customer?.Address || "",
    City: customer?.City || "",
    PostalCode: customer?.PostalCode || "",
    NationalCode: customer?.NationalCode || "",
    TaxCode: customer?.TaxCode || "",
    Mobile: customer?.Mobile || "",
    Description: customer?.Description || "",
    CreatedAt: customer?.CreatedAt || "",
    UpdatedAt: customer?.UpdatedAt || "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.FullName || !formData.GroupId) {
      alert("نام و گروه مشتری الزامی است");
      return;
    }
    onSave(formData);
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <input name="FullName" value={formData.FullName} onChange={handleChange} placeholder="نام کامل" required />
      <input name="Email" value={formData.Email} onChange={handleChange} placeholder="ایمیل" />
      <input name="Phone" value={formData.Phone} onChange={handleChange} placeholder="تلفن" />
      <input name="GroupId" value={formData.GroupId} onChange={handleChange} placeholder="گروه" required />
      <input name="CreditRial" value={formData.CreditRial} onChange={handleChange} placeholder="اعتبار ریالی" type="number" />
      <input name="CreditLetter" value={formData.CreditLetter} onChange={handleChange} placeholder="اعتبار حروفی" type="number" />
      <input name="Address" value={formData.Address} onChange={handleChange} placeholder="آدرس" />
      <input name="City" value={formData.City} onChange={handleChange} placeholder="شهر" />
      <input name="PostalCode" value={formData.PostalCode} onChange={handleChange} placeholder="کد پستی" />
      <input name="NationalCode" value={formData.NationalCode} onChange={handleChange} placeholder="کد ملی" />
      <input name="TaxCode" value={formData.TaxCode} onChange={handleChange} placeholder="کد مالیاتی" />
      <input name="Mobile" value={formData.Mobile} onChange={handleChange} placeholder="موبایل" />
      <input name="Description" value={formData.Description} onChange={handleChange} placeholder="توضیحات" />
      <input name="CreatedAt" value={toPersianDate(formData.CreatedAt)} placeholder="تاریخ ثبت" readOnly />
      <input name="UpdatedAt" value={toPersianDate(formData.UpdatedAt)} placeholder="تاریخ به‌روزرسانی" readOnly />

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

  // خروجی اکسل
  const exportToExcel = () => {
    if (!customers.length) return;
    const worksheet = XLSX.utils.json_to_sheet(
      customers.map(c => ({
        "کد مشتری": c.Id,
        "نام کامل": c.FullName,
        "ایمیل": c.Email,
        "تلفن": c.Phone,
        "گروه": c.GroupId,
        "اعتبار ریالی": c.CreditRial,
        "اعتبار حروفی": c.CreditLetter,
        "آدرس": c.Address,
        "شهر": c.City,
        "کد پستی": c.PostalCode,
        "کد ملی": c.NationalCode,
        "کد مالیاتی": c.TaxCode,
        "موبایل": c.Mobile,
        "توضیحات": c.Description,
        "تاریخ ثبت": toPersianDate(c.CreatedAt),
        "تاریخ به‌روزرسانی": toPersianDate(c.UpdatedAt),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "مشتریان");
    XLSX.writeFile(workbook, "customers.xlsx");
  };

  // خروجی PDF با نسخه جدید
  const exportToPDF = async () => {
    if (!customers.length) return;

    const { filePath, canceled } = await ipcRenderer.invoke("show-save-dialog", {
      title: "ذخیره PDF مشتریان",
      defaultPath: "customers.pdf",
      filters: [{ name: "PDF", extensions: ["pdf"] }],
    });

    if (canceled || !filePath) return;

    const doc = new jsPDF("l", "mm", "a4");
    doc.text("گزارش مشتریان", 14, 15);

    const columns = [
      "کد مشتری","نام کامل","ایمیل","تلفن","گروه","اعتبار ریالی","اعتبار حروفی",
      "آدرس","شهر","کد پستی","کد ملی","کد مالیاتی","موبایل","توضیحات","تاریخ ثبت","تاریخ به‌روزرسانی"
    ];

    const rows = customers.map(c => [
      c.Id, c.FullName, c.Email, c.Phone, c.GroupId, c.CreditRial, c.CreditLetter,
      c.Address, c.City, c.PostalCode, c.NationalCode, c.TaxCode, c.Mobile, c.Description,
      toPersianDate(c.CreatedAt), toPersianDate(c.UpdatedAt)
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 8, cellWidth: "wrap" }
    });

    const pdfBuffer = doc.output("arraybuffer");
    const result = await ipcRenderer.invoke("save-pdf-file", { filePath, data: pdfBuffer });

    if (result.success) alert("PDF با موفقیت ذخیره شد!");
    else alert("خطا در ذخیره PDF: " + result.error);
  };

  return (
    <div className="customers-container">
      <h2>مدیریت مشتریان</h2>

      {!showForm && !editingCustomer && (
        <div className="actions-bar">
          <button className="btn-submit" onClick={() => setShowForm(true)}>+ افزودن مشتری جدید</button>
          <button className="btn-excel" onClick={exportToExcel}>📊 خروجی اکسل</button>
          <button className="btn-print" onClick={exportToPDF}>🖨 چاپ / PDF</button>
        </div>
      )}

      {(showForm || editingCustomer) && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingCustomer(null); }}
        />
      )}

      <table className="customers-table">
        <thead>
          <tr>
            <th>کد مشتری</th><th>نام کامل</th><th>ایمیل</th><th>تلفن</th><th>گروه</th>
            <th>اعتبار ریالی</th><th>اعتبار حروفی</th><th>آدرس</th><th>شهر</th><th>کد پستی</th>
            <th>کد ملی</th><th>کد مالیاتی</th><th>موبایل</th><th>توضیحات</th>
            <th>تاریخ ثبت</th><th>تاریخ به‌روزرسانی</th><th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.Id}>
              <td>{c.Id}</td><td>{c.FullName}</td><td>{c.Email}</td><td>{c.Phone}</td><td>{c.GroupId}</td>
              <td>{c.CreditRial}</td><td>{c.CreditLetter}</td><td>{c.Address}</td><td>{c.City}</td><td>{c.PostalCode}</td>
              <td>{c.NationalCode}</td><td>{c.TaxCode}</td><td>{c.Mobile}</td><td>{c.Description}</td>
              <td>{toPersianDate(c.CreatedAt)}</td><td>{toPersianDate(c.UpdatedAt)}</td>
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
