const request = require('supertest');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const app = require('../../app');

jest.mock('../../models');

describe('POST /api/login', () => {
  it('should login a user with valid credentials from body', async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'password123',
    };

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    User.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: userData.email,
      password: hashedPassword,
    });

    const response = await request(app)
      .post('/api/login')
      .send(userData)
      .expect(200);

    expect(response.body).toMatchObject({
      email: userData.email,
    });
  });

  it('should login a user with valid credentials from query', async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'password123',
    };

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    User.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: userData.email,
      password: hashedPassword,
    });

    const response = await request(app)
      .post('/api/login')
      .query(userData)
      .expect(200);

    expect(response.body).toMatchObject({
      email: userData.email,
    });
  });

  it('should login a user with valid credentials from headers', async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'password123',
    };

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    User.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: userData.email,
      password: hashedPassword,
    });

    const response = await request(app)
      .post('/api/login')
      .set('x-email', userData.email)
      .set('x-password', userData.password)
      .expect(200);

    expect(response.body).toMatchObject({
      email: userData.email,
    });
  });

  it('should return 400 if any field is missing', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
      })
      .expect(400);

    expect(response.body.message).toBe('All fields are required');
  });

  it('should return 400 if user not found', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      })
      .expect(400);

    expect(response.body.message).toBe('User not found');
  });

  it('should return 400 if password is invalid', async () => {
    const userData = {
      email: 'testuser@example.com',
      password: 'password123',
    };

    const hashedPassword = await bcrypt.hash('wrongpassword', 10);

    User.findOne.mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: userData.email,
      password: hashedPassword,
    });

    const response = await request(app)
      .post('/api/login')
      .send(userData)
      .expect(400);

    expect(response.body.message).toBe('Invalid password');
  });
});