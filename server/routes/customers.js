// server/routes/customers.js
import express from 'express';
import sql from 'mssql';
const router = express.Router();


const config = {
  user: 'sa',            // SQL User
  password: 'Qaz@Zaq_123',// رمز عبور
  server: 'localhost',
  database: 'SmartAccounting',
  options: {
    trustServerCertificate: true
  }
};

// گرفتن تمام مشتریان
router.get('/', async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * FROM Customers');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router; // ← این خط خیلی مهمه
