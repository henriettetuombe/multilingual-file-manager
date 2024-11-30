const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

// Mock File model
jest.mock('../../models', () => {
  return {
    File: {
      create: jest.fn(),
    },
  };
});

describe('POST /api/files', () => {
  it('should create a new file', async () => {
    const fileData = {
      userId: '507f1f77bcf86cd799439011', // Mock MongoDB ObjectId
      name: 'testfile.txt',
      size: 1024,
      type: 'txt',
      path: '/files/testfile.txt',
    };

    // Mock the resolved value to mimic a database entry
    File.create.mockResolvedValue({
      ...fileData,
      _id: '507f1f77bcf86cd799439012', // MongoDB document _id
    });

    const response = await request(app)
      .post('/api/files')
      .send(fileData)
      .expect(201);

    expect(response.body).toEqual({
      ...fileData,
      _id: '507f1f77bcf86cd799439012',
    });

    expect(File.create).toHaveBeenCalledWith(fileData);
  });

  it('should return 400 if required fields are missing', async () => {
    const incompleteData = {
      userId: '507f1f77bcf86cd799439011',
      name: 'testfile.txt',
    };

    const response = await request(app)
      .post('/api/files')
      .send(incompleteData)
      .expect(400);

    expect(response.body.message).toBe('All fields are required');
    expect(File.create).not.toHaveBeenCalled();
  });

  it('should return 500 if there is a server error', async () => {
    const fileData = {
      userId: '507f1f77bcf86cd799439011',
      name: 'testfile.txt',
      size: 1024,
      type: 'txt',
      path: '/files/testfile.txt',
    };

    // Mock a rejected promise to simulate a server error
    File.create.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/files')
      .send(fileData)
      .expect(500);

    expect(response.body.message).toBe('Error creating file');
    expect(File.create).toHaveBeenCalledWith(fileData);
  });
});
