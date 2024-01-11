const pool = require('../models/friendModel');

/* 

  ==========================================

  Handles incoming HTTP requests
  Calls corresponding functions in the model

  ==========================================

*/

// Create friend

const createFriend = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, notes, userId } = req.body;
  // if (
  //   !req.body ||
  //   !firstName ||
  //   !lastName ||
  //   !email ||
  //   !phoneNumber ||
  //   !notes ||
  //   !userId
  // ) {
  //   return res.status(400).send('Missing required fields');
  // }

  try {
    const friend = await pool.createFriend(
      firstName,
      lastName,
      email,
      phoneNumber,
      notes,
      userId
    );
    console.log('Friend created: ', friend);
    res.status(201).send(friend);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.message || 'An error occurred while creating the friend.',
    });
  }
};

// Read all friends

const readAllFriends = async (req, res) => {
  console.log(
    'Received request to read all friends for userId: ',
    req.params.userId
  );
  try {
    const result = await pool.readAllFriends(req.params.userId);
    console.log('Sending friends list: ', result);
    res.send(result);
  } catch (err) {
    console.error('Error reading all friends: ', err);
    res.status(500).send(err);
  }
};

// Read one friend

const readOneFriend = async (req, res) => {
  try {
    const result = await pool.readOneFriend(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update friend

const updateFriend = async (req, res) => {
  try {
    const result = await pool.updateFriend(
      req.params.id,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phoneNumber,
      req.body.notes,
      req.body.userId
    );
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete friend

const deleteFriend = async (req, res) => {
  try {
    const result = await pool.deleteFriend(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createFriend,
  readAllFriends,
  readOneFriend,
  updateFriend,
  deleteFriend,
};
