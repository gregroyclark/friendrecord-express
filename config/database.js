const mysql = require('mysql2');

require('dotenv').config();

// // local
// const db = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   port: Number(process.env.MYSQL_PORT),
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

// prod
const db = mysql.createPool({
  database_url: process.env.PLANETSCALE_DATABASE_URL,
  database: process.env.DATABASE,
  host: process.env.PLANETSCALE_DB_HOST,
  user: process.env.PLANETSCALE_DB_USERNAME,
  password: process.env.PLANETSCALE_DB_PASSWORD,
  port: Number(process.env.MYSQL_PORT),
});

db.getConnection((error, connection) => {
  try {
    connection.release();
    console.log('Connected to the database');
  } catch (err) {
    if (err) {
      throw new Error('Error connecting to the database: ', error);
    }
  }
});

// db.getConnection((err, connection) => {
//   if (err) throw err;
//   console.log('Connected to the database');
//   connection.release();
// });

module.exports = { db };
