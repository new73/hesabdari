// db.js
import sql from "mssql";

// تنظیمات اتصال به SQL Server
const config = {
  user: "sa",           // یوزری که داری
  password: "123456", // پسوردت
  server: "localhost",  // آدرس سرور
  database: "SmartAccounting", // نام دیتابیس
  options: {
    trustServerCertificate: true, // برای self-signed certificate
  },
};

// تابعی که داده‌ها رو از جدول Products می‌خونه
export async function getProductsFromDB() {
  try {
    // اتصال به دیتابیس
    let pool = await sql.connect(config);

    // اجرای کوئری
    let result = await pool.request().query("SELECT Id, ProductName, Price, Stock FROM Products");

    return result.recordset; // آرایه‌ی محصولات
  } catch (err) {
    console.error("DB Error:", err);
    return []; // در صورت خطا آرایه خالی برگردان
  } finally {
    await sql.close();
  }
}
