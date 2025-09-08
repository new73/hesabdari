// server/routes/customers.js
import express from "express";
import { getPool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Customers");
    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error fetching customers:", err.message);
    res.status(500).send("Server error while fetching customers");
  }
});

export default router;