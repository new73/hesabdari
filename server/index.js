import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import customersRouter from "./routes/customers.js"; // ← اضافه کردن مسیر مشتریان

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// مسیرها
app.use("/api/products", productsRouter);
app.use("/api/customers", customersRouter); // ← ثبت مسیر مشتریان

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
