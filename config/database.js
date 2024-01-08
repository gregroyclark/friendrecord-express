const mysql = require('mysql2');

require('dotenv').config();

// // local
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// prod
// const db = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   port: Number(process.env.MYSQL_PORT),
//   user: process.env.PLANETSCALE_DB_USERNAME,
//   password: process.env.PLANETSCALE_DB_PASSWORD,
//   database: process.env.PLANETSCALE_DB,
// });

db.getConnection((error, connection) => {
  try {
    connection.release();
    console.log('Connected to the database');
  } catch (error) {
    throw new Error('Error connecting to the database: ', error);
  }
});

module.exports = { db };
