// server/index.cjs
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// نمونه محصولات
let products = [
  { Id: 1, ProductName: "کیبورد مکانیکی", Price: 1200000, Stock: 150, WarehouseId: 1, CategoryId: 1, Description: "کیبورد با نور RGB" },
  { Id: 2, ProductName: "گوشی موبایل XPhone", Price: 18500000, Stock: 30, WarehouseId: 2, CategoryId: 2, Description: "گوشی هوشمند جدید" },
];

// نمونه مشتریان
let customers = [
  { Id: 1, FullName: "علی احمدی", Phone: "09120000000", Email: "ali@example.com", GroupId: 1, CreatedAt: new Date(), UpdatedAt: new Date() },
  { Id: 2, FullName: "سارا رضایی", Phone: "09121111111", Email: "sara@example.com", GroupId: 2, CreatedAt: new Date(), UpdatedAt: new Date() },
];

// محصولات API
app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const newProduct = { Id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.map(p => p.Id === id ? { ...p, ...req.body } : p);
  res.json({ success: true });
});
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.Id !== id);
  res.json({ success: true });
});

// مشتریان API
app.get("/api/customers", (req, res) => res.json(customers));
app.post("/api/customers", (req, res) => {
  const newCustomer = { Id: customers.length + 1, CreatedAt: new Date(), UpdatedAt: new Date(), ...req.body };
  customers.push(newCustomer);
  res.json(newCustomer);
});
app.put("/api/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.map(c => c.Id === id ? { ...c, ...req.body, UpdatedAt: new Date() } : c);
  res.json({ success: true });
});
app.delete("/api/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  customers = customers.filter(c => c.Id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
