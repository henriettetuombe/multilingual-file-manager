const request = require('supertest');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const app = require('../../app');

// Mock User model and bcrypt
jest.mock('../../models', () => ({
  User: {
    findOne: jest.fn(),
  },
}));
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('POST /user/login', () => {
  it('should login a user with valid credentials', async () => {
    const userData = { email: 'testuser@example.com', password: 'password123' };

    User.findOne.mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      username: 'testuser',
      email: userData.email,
      password: 'hashedPassword', // Stored hashed password
    });

    bcrypt.compare.mockResolvedValue(true); // Simulate valid password

    const response = await request(app)
      .post('/user/login')
      .send(userData)
      .expect(200);

    expect(response.body).toMatchObject({
      email: userData.email,
    });
  });

  it('should return 400 if user not found', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/user/login')
      .send({ email: 'unknown@example.com', password: 'password123' })
      .expect(400);

    expect(response.body.message).toBe('User not found');
  });

  it('should return 400 if password is invalid', async () => {
    User.findOne.mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'hashedPassword',
    });

    bcrypt.compare.mockResolvedValue(false); // Simulate invalid password

    const response = await request(app)
      .post('/user/login')
      .send({ email: 'testuser@example.com', password: 'wrongpassword' })
      .expect(400);

    expect(response.body.message).toBe('Invalid password');
  });

  it('should return 400 if any field is missing', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ email: 'testuser@example.com' }) // Missing password
      .expect(400);

    expect(response.body.message).toBe('All fields are required');
  });
});
