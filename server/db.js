import sql from 'mssql';

const dbConfig = {
  user: 'sa',
  password: 'Qaz@Zaq_123',
  server: 'localhost',
  database: 'SmartAccounting',
  options: { encrypt: false, trustServerCertificate: true }
};

export const poolPromise = sql.connect(dbConfig);
