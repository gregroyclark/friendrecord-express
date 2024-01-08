const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const userController = require('./userController');
let db = require('../config/database');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models/userModel');

beforeEach(() => {
  db = require('../config/database');
});

afterEach(async () => {
  let connection;
  try {
    connection = await db.getConnection();
  } catch {
  } finally {
    if (connection) {
      await connection.release();
    }
  }
});

describe('register', () => {
  it('should hash the password and create a user', async () => {
    const req = { body: { email: 'test@test.com', password: 'password' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    const hashedPassword = 'hashedPassword';
    bcrypt.hash.mockResolvedValue(hashedPassword);

    const user = { id: 1 };
    userModel.createUser.mockResolvedValue(user);

    await userController.register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
    expect(userModel.createUser).toHaveBeenCalledWith(
      req.body.email,
      hashedPassword,
      'user'
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(user);
  });
});
