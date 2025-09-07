// server/db.js
import sql from "mssql";

const config = {
  user: "sa",             // نام کاربری SQL Server
  password: "Qaz@Zaq_123", // پسورد شما
  server: "localhost",     // آدرس سرور
  database: "SmartAccounting",
  options: {
    trustServerCertificate: true, // برای self-signed certificate
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    throw err;
  }
}
