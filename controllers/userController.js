const pool = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* 

  ==========================================

  Handles incoming HTTP requests
  Calls corresponding functions in the model

  ==========================================

*/

const register = async (req, res) => {
  if (
    !req.body ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).send('Missing required fields');
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await pool.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword,
      'user'
    );
    console.log('User registered: ', user);
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error registering user');
  }
};

const login = async (req, res) => {
  console.log('Handling login request...');

  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).send('Missing required fields');
  }

  const user = await pool.findUserByEmail(req.body.email);
  console.log('User found: ', user);

  console.log('Comparing password: ', req.body.password);
  console.log('With hashedPassword: ', user.hashedPassword);

  let isAuthenticated = false;

  if (user && user.hashedPassword) {
    isAuthenticated = await bcrypt.compare(
      req.body.password,
      user.hashedPassword
    );

    console.log('Authentication result: ', isAuthenticated);
  }

  if (isAuthenticated) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('Generated JWT: ', token);

    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).send({ user, userId: user.userId, token });
  } else {
    console.log('Authentication failed');
    res.status(401).send('Invalid username or password');
  }

  // if (user && (await bcrypt.compare(req.body.password, user.password))) {
  //   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  //     expiresIn: '1h',
  //   });

  //   res.cookie('jwt', token, { httpOnly: true });
  //   res.status(200).send(user);
  // } else {
  //   res.status(401).send('Invalid username or password');
  // }
};

module.exports = { register, login };
