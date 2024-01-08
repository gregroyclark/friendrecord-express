const { v4: uuidv4 } = require('uuid');

const { db } = require('../config/database');

exports.createUser = async (firstName, lastName, email, hashedPassword) => {
  try {
    const existingUser = await exports.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already taken');
    }
  } catch (error) {}
  return new Promise((resolve, reject) => {
    const userId = uuidv4();
    const query =
      'INSERT INTO users (firstName, lastName, email, hashedPassword, userId) VALUES (?, ?, ?, ?, ?)';
    const values = [firstName, lastName, email, hashedPassword, userId];
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
};
