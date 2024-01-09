const mysql = require('mysql2');

require('dotenv').config();

// // local
const db = mysql.createPool({
  uri: process.env.DATABASE_URL,
  // host: process.env.MYSQL_HOST,
  // port: Number(process.env.MYSQL_PORT),
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,
});

// prod
// const db = mysql.createPool({
//   url: process.env.DATABASE_URL,
//   database: process.env.DATABASE,
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: Number(process.env.MYSQL_PORT),
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

// const testConnection = async () => {
//   try {
//     const connection = await db.getConnection();
//     console.log('Connected to the database');
//     connection.release();
//   } catch (error) {
//     console.error('Error connecting to the database: ', error);
//     throw new Error('Error connecting to the database: ', error);
//   }
// };

// testConnection();

db.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
  connection.release();
});

module.exports = { db };
