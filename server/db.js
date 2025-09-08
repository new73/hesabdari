import sql from "mssql";

const config = {
  user: "sa",
  password: "Qaz@Zaq_123",
  server: "localhost",
  database: "SmartAccounting",
  options: { trustServerCertificate: true },
};

export async function getConnection() {
  const pool = await sql.connect(config);
  return pool;
}
