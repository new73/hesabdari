// dal/db.js
const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'your_password',
  server: 'localhost',
  database: 'YourDB',
  options: {
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => pool)
  .catch(err => console.log('DB Connection Error:', err));

function getProducts() {
  return poolPromise.then(pool =>
    pool.request().query('SELECT * FROM Products').then(result => result.recordset)
  );
}

module.exports = { getProducts };
