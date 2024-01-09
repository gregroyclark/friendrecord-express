const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
    throw new Error('Error connecting to the database: ', error);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = { pool };

// =========================================

/* 

  ==========================================

  MySQL works with planetscale & vercel.
  Render only has paid MySQL.
  Have to migrate to PostgreSQL.

  ==========================================

*/

// const mysql = require('mysql2');

// require('dotenv').config();

// const db = mysql.createPool({
//   uri: process.env.DATABASE_URL,
//   //   // host: process.env.MYSQL_HOST,
//   //   // port: Number(process.env.MYSQL_PORT),
//   //   // user: process.env.MYSQL_USER,
//   //   // password: process.env.MYSQL_PASSWORD,
//   //   // database: process.env.MYSQL_DATABASE,
// });

// db.getConnection((error, connection) => {
//   try {
//     connection.release();
//     console.log('Connected to the database');
//   } catch (err) {
//     if (err) {
//       console.error('Error connecting to the database: ', err);
//       throw new Error('Error connecting to the database: ', error);
//     }
//   }
// });

// module.exports = { db };
