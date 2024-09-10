const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "harouna",
  database: "order_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connection = async () => {
  try {
    const connection = await pool.getConnection();  
    console.log("Connected using connection pool!");
    return connection;
  } catch (err) {
    console.error("Connection failed: ", err.message);
    throw err;
  }
};

module.exports = { pool, connection };
