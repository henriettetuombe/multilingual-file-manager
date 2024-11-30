const request = require('supertest');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const app = require('../../app');

// Mock User model
jest.mock('../../models', () => ({
  User: {
    create: jest.fn(),
  },
}));

describe('POST /user/register', () => {
  it('should register a user from request body', async () => {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Mock User.create to return a user object
    User.create.mockResolvedValue({
      ...userData,
      _id: '507f1f77bcf86cd799439011',
      password: hashedPassword,
    });

    const response = await request(app)
      .post('/user/register')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      username: userData.username,
      email: userData.email,
    });
  });

  it('should return 400 if any field is missing', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({ username: 'testuser' }) // Missing email and password
      .expect(400);

    expect(response.body.message).toBe('All fields are required');
  });

  it('should return 500 if there is a server error', async () => {
    // Mock User.create to throw an error
    User.create.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/user/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(500);

    expect(response.body.message).toBe('Error registering user');
  });
});
