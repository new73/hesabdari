import express from "express";
import sql from "mssql";
import { getConnection } from "../db.js";

const router = express.Router();

// GET all customers
router.get("/", async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Customers");
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در دریافت مشتریان" });
  }
});

// POST add new customer
router.post("/", async (req, res) => {
  const {
    FullName, Email, Phone, GroupId, CreditRial, CreditLetter,
    Address, City, PostalCode, NationalCode, TaxCode, Mobile, Description
  } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input("FullName", sql.NVarChar(200), FullName)
      .input("Email", sql.NVarChar(200), Email || null)
      .input("Phone", sql.NVarChar(50), Phone || null)
      .input("GroupId", sql.Int, GroupId || null)
      .input("CreditRial", sql.Decimal(18,2), CreditRial || null)
      .input("CreditLetter", sql.Decimal(18,2), CreditLetter || null)
      .input("Address", sql.NVarChar(200), Address || null)
      .input("City", sql.NVarChar(50), City || null)
      .input("PostalCode", sql.NVarChar(20), PostalCode || null)
      .input("NationalCode", sql.NVarChar(20), NationalCode || null)
      .input("TaxCode", sql.NVarChar(50), TaxCode || null)
      .input("Mobile", sql.NVarChar(20), Mobile || null)
      .input("Description", sql.NVarChar(500), Description || null)
      .query(`
        INSERT INTO Customers 
        (FullName, Email, Phone, GroupId, CreditRial, CreditLetter, Address, City, PostalCode, NationalCode, TaxCode, Mobile, Description, CreatedAt, UpdatedAt)
        VALUES 
        (@FullName, @Email, @Phone, @GroupId, @CreditRial, @CreditLetter, @Address, @City, @PostalCode, @NationalCode, @TaxCode, @Mobile, @Description, GETDATE(), GETDATE());
        SELECT SCOPE_IDENTITY() AS Id;
      `);

    res.json({ Id: result.recordset[0].Id, FullName, Email, Phone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در افزودن مشتری" });
  }
});

// PUT edit customer
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    FullName, Email, Phone, GroupId, CreditRial, CreditLetter,
    Address, City, PostalCode, NationalCode, TaxCode, Mobile, Description
  } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input("Id", sql.Int, id)
      .input("FullName", sql.NVarChar(200), FullName)
      .input("Email", sql.NVarChar(200), Email || null)
      .input("Phone", sql.NVarChar(50), Phone || null)
      .input("GroupId", sql.Int, GroupId || null)
      .input("CreditRial", sql.Decimal(18,2), CreditRial || null)
      .input("CreditLetter", sql.Decimal(18,2), CreditLetter || null)
      .input("Address", sql.NVarChar(200), Address || null)
      .input("City", sql.NVarChar(50), City || null)
      .input("PostalCode", sql.NVarChar(20), PostalCode || null)
      .input("NationalCode", sql.NVarChar(20), NationalCode || null)
      .input("TaxCode", sql.NVarChar(50), TaxCode || null)
      .input("Mobile", sql.NVarChar(20), Mobile || null)
      .input("Description", sql.NVarChar(500), Description || null)
      .query(`
        UPDATE Customers
        SET FullName=@FullName, Email=@Email, Phone=@Phone, GroupId=@GroupId,
            CreditRial=@CreditRial, CreditLetter=@CreditLetter, Address=@Address,
            City=@City, PostalCode=@PostalCode, NationalCode=@NationalCode,
            TaxCode=@TaxCode, Mobile=@Mobile, Description=@Description,
            UpdatedAt=GETDATE()
        WHERE Id=@Id
      `);

    res.json({ message: "مشتری با موفقیت ویرایش شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ویرایش مشتری" });
  }
});

// DELETE customer
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request().input("Id", sql.Int, id).query("DELETE FROM Customers WHERE Id=@Id");
    res.json({ message: "مشتری با موفقیت حذف شد" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در حذف مشتری" });
  }
});

export default router;
