import express from 'express';
import sql from 'mssql';
import { toJalaali } from 'jalaali-js';

export default function(dbConfig) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query('SELECT * FROM Customers');
      const data = result.recordset.map(r => ({
        ...r,
        CreatedAt: toJalaaliDate(r.CreatedAt),
        UpdatedAt: toJalaaliDate(r.UpdatedAt),
      }));
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطا در دریافت مشتریان' });
    }
  });

  router.post('/', async (req, res) => {
    const { FullName, Email, Phone, GroupId, CreditRial, CreditLetter, Address, City, PostalCode, NationalCode, TaxCode, Mobile, Description } = req.body;
    try {
      await sql.connect(dbConfig);
      await sql.query`INSERT INTO Customers (FullName, Email, Phone, GroupId, CreditRial, CreditLetter, Address, City, PostalCode, NationalCode, TaxCode, Mobile, Description, CreatedAt, UpdatedAt)
                      VALUES (${FullName}, ${Email}, ${Phone}, ${GroupId}, ${CreditRial}, ${CreditLetter}, ${Address}, ${City}, ${PostalCode}, ${NationalCode}, ${TaxCode}, ${Mobile}, ${Description}, GETDATE(), GETDATE())`;
      res.json({ message: 'مشتری اضافه شد' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطا در افزودن مشتری' });
    }
  });

  // PUT و DELETE هم مشابه با sql.query

  return router;
}

function toJalaaliDate(date) {
  if (!date) return null;
  const j = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${j.jy}/${j.jm}/${j.jd}`;
}
