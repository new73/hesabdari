import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>لیست محصولات</h2>
      <AddProduct onProductAdded={handleProductAdded} />

      {loading ? <p>در حال بارگذاری...</p> : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Id</th>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>انبار</th>
              <th>دسته‌بندی</th>
              <th>توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.Id}>
                <td>{p.Id}</td>
                <td>{p.ProductName}</td>
                <td>{p.Price}</td>
                <td>{p.Stock}</td>
                <td>{p.WarehouseId}</td>
                <td>{p.CategoryId || "-"}</td>
                <td>{p.Description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
