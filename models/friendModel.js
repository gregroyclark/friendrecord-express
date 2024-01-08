const { db } = require('../config/database');

/* 

  ==========================================

  Database queries

  ==========================================

*/

// createFriend

exports.createFriend = (
  firstName,
  lastName,
  email,
  phoneNumber,
  notes,
  userId
) => {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO friends (firstName, lastName, email, phoneNumber, notes, userId) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, email, phoneNumber, notes, userId];
    db.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        reject({ err: 'An error occurred while executing the SQL query.' });
      }
      resolve(result);
    });
  });
};

// readAllFriends

exports.readAllFriends = (userId) => {
  console.log('Reading friends for userId: ', userId);
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM friends where userId = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.log('Error executing query: ', err);
        reject(err);
      }
      console.log('Query result: ', result);
      resolve(result);
    });
  });
};

// readOneFriend

exports.readOneFriend = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM friends WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// updateFriend

exports.updateFriend = (
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  notes,
  userId
) => {
  return new Promise((resolve, reject) => {
    const query =
      'UPDATE friends SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, notes = ?, userId = ? WHERE id = ?';
    const values = [firstName, lastName, email, phoneNumber, notes, userId, id];
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// deleteFriend

exports.deleteFriend = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM friends WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
