import sql from 'mssql';

const config = {
  user: 'sa',            // SQL User
  password: 'Qaz@Zaq_123',// رمز عبور
  server: 'localhost',
  database: 'SmartAccounting',
  options: {
    trustServerCertificate: true
  }
};

async function testConnection() {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server successfully!');
    await pool.close();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

testConnection();
