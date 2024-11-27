const request = require('supertest');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const app = require('../../app');

jest.mock('../../models');

describe('POST /api/register', () => {
  it('should register a user from request body', async () => {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    };

    User.create.mockResolvedValue({
      ...userData,
      id: 1,
      password: await bcrypt.hash(userData.password, 10),
    });

    const response = await request(app)
      .post('/api/register')
      .send(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      username: userData.username,
      email: userData.email,
    });
  });

  it('should return 400 if any field is missing', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
      })
      .expect(400);

    expect(response.body.message).toBe('All fields are required');
  });

  it('should return 500 if there is a server error', async () => {
    User.create.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(500);

    expect(response.body.message).toBe('Error registering user');
  });
});
