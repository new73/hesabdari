import express from 'express';
import sql from 'mssql';

export default function(dbConfig) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query('SELECT * FROM Products');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطا در دریافت محصولات' });
    }
  });

  router.post('/', async (req, res) => {
    const { ProductName, Price, Stock, WarehouseId, CategoryId, Description } = req.body;
    try {
      await sql.connect(dbConfig);
      await sql.query`INSERT INTO Products (ProductName, Price, Stock, WarehouseId, CategoryId, Description, CreatedAt, UpdatedAt)
                      VALUES (${ProductName}, ${Price}, ${Stock}, ${WarehouseId}, ${CategoryId}, ${Description}, GETDATE(), GETDATE())`;
      res.json({ message: 'محصول اضافه شد' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'خطا در افزودن محصول' });
    }
  });

  return router;
}
