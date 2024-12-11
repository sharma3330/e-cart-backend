const mysql = require('mysql2');
const pool = mysql.createPool({
    port: process.env.DB_PORT,        
    host: process.env.DB_HOST,
    user: process.env.DB_USER,   
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log({
    port: process.env.DB_PORT,        
    host: process.env.DB_HOST,
    user: process.env.DB_USER,   
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
    connection.release();
  });
  module.exports = pool;