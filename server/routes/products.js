import express from "express";
import { getConnection } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { ProductName, Price, Stock, WarehouseId, CategoryId, Description } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("ProductName", ProductName)
      .input("Price", Price)
      .input("Stock", Stock)
      .input("WarehouseId", WarehouseId)
      .input("CategoryId", CategoryId)
      .input("Description", Description)
      .query(`INSERT INTO Products (ProductName, Price, Stock, WarehouseId, CategoryId, Description)
              VALUES (@ProductName, @Price, @Stock, @WarehouseId, @CategoryId, @Description);
              SELECT SCOPE_IDENTITY() AS Id;`);
    res.json({ Id: result.recordset[0].Id, ProductName, Price, Stock, WarehouseId, CategoryId, Description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در افزودن محصول" });
  }
});

export default router;