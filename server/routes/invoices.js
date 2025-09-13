import express from "express";
import sql from "mssql";

const router = express.Router();

const dbConfig = {
  user: "sa",
  password: "Qaz@Zaq_123",
  server: "localhost",
  database: "SmartAccounting",
  options: { encrypt: false, trustServerCertificate: true }
};

router.get("/", async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query("SELECT * FROM Invoices");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در دریافت فاکتورها" });
  }
});

export default router;
