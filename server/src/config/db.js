const mysql = require("mysql2/promise");
require("dotenv").config();

// Helper to determine if we're in a production environment
const isProduction = process.env.NODE_ENV === "production" || process.env.NODE_ENV === "prod" || !!process.env.MYSQLHOST;

let dbConfig = {
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Prioritize full DATABASE_URL if properly formatted (e.g., from Render/Railway)
if (process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith("mysql://")) {
  dbConfig.uri = process.env.DATABASE_URL;
} else if (isProduction) {
  // Typical individual env vars setup for production
  dbConfig.host = process.env.MYSQLHOST || process.env.DB_HOST;
  dbConfig.user = process.env.MYSQLUSER || process.env.DB_USER;
  dbConfig.password = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD;
  dbConfig.database = process.env.MYSQLDATABASE || process.env.DB_NAME;
  dbConfig.port = process.env.MYSQLPORT || process.env.DB_PORT || 3306;
} else {
  // Local development setup
  dbConfig.host = process.env.DB_HOST || "localhost";
  dbConfig.user = process.env.DB_USER || "root";
  dbConfig.password = process.env.DB_PASSWORD || "";
  dbConfig.database = process.env.DB_NAME || "test";
  dbConfig.port = process.env.DB_PORT || 3306;
}

const pool = mysql.createPool(dbConfig);

// Test connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    const envName = isProduction ? "Production" : "Local";
    console.log(`✅ MySQL Connected to ${envName} Database (Connection Pool Ready)`);
    connection.release();
  } catch (err) {
    console.error(`❌ Database connection failed (${isProduction ? 'Production' : 'Local'}):`, err.message);
  }
})();

module.exports = pool;
