import express from "express";
import { getConnection } from "../db.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در دریافت محصولات" });
  }
});

// POST add new product
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
      .query(`
        INSERT INTO Products (ProductName, Price, Stock, WarehouseId, CategoryId, Description, CreatedAt, UpdatedAt)
        VALUES (@ProductName, @Price, @Stock, @WarehouseId, @CategoryId, @Description, GETDATE(), GETDATE());
        SELECT SCOPE_IDENTITY() AS Id;
      `);
    res.json({ Id: result.recordset[0].Id, ProductName, Price, Stock, WarehouseId, CategoryId, Description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در افزودن محصول" });
  }
});

// PUT edit product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { ProductName, Price, Stock, WarehouseId, CategoryId, Description } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input("Id", id)
      .input("ProductName", ProductName)
      .input("Price", Price)
      .input("Stock", Stock)
      .input("WarehouseId", WarehouseId)
      .input("CategoryId", CategoryId)
      .input("Description", Description)
      .query(`
        UPDATE Products
        SET ProductName=@ProductName, Price=@Price, Stock=@Stock,
            WarehouseId=@WarehouseId, CategoryId=@CategoryId, Description=@Description,
            UpdatedAt=GETDATE()
        WHERE Id=@Id
      `);
    res.json({ message: "محصول با موفقیت ویرایش شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ویرایش محصول" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("Id", id).query("DELETE FROM Products WHERE Id=@Id");
    res.json({ message: "محصول با موفقیت حذف شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در حذف محصول" });
  }
});

export default router;
