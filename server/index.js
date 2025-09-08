import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = 5000;

// فعال کردن CORS برای مرورگر
app.use(cors());
app.use(bodyParser.json());

// مسیر محصولات
app.use("/api/products", productsRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
