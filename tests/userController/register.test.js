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

  it('should register a user from query parameters', async () => {
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
      .query(userData)
      .expect(201);

    expect(response.body).toMatchObject({
      username: userData.username,
      email: userData.email,
    });
  });

  it('should register a user from headers', async () => {
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
      .set('x-username', userData.username)
      .set('x-email', userData.email)
      .set('x-password', userData.password)
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
});
