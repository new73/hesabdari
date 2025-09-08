import React, { useEffect, useState } from "react";
import "./styles/Products.css";
import AddProduct from "./AddProduct";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="products-page">
      <h2>محصولات</h2>

      <AddProduct onProductAdded={handleProductAdded} />

      <table className="products-table">
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>موجودی</th>
            <th>انبار</th>
            <th>دسته‌بندی</th>
            <th>توضیحات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
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
    </div>
  );
}
