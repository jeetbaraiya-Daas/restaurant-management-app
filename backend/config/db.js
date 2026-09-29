// Week 4 Deliverable: Connect MySQL to Express using mysql2 pool
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "restaurant_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection on startup
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database (restaurant_db)");
    connection.release();
  } catch (error) {
    console.warn(" MySQL connection warning:", error.message);
  }
}

testConnection();

module.exports = pool;
