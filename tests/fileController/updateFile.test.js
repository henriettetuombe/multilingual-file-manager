const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

// Mock File model
jest.mock('../../models', () => {
  return {
    File: {
      findByPk: jest.fn(),
      update: jest.fn(),
    }
  };
});

describe('PUT /api/files/:id', () => {
  it('should update a file', async () => {
    const file = { id: 1, name: 'testfile', size: 1024, type: 'txt', path: '/files/testfile.txt' };
    const updatedFile = { ...file, name: 'updatedfile' };

    // Mock the file found by ID and the update method
    File.findByPk.mockResolvedValue(file);
    File.update.mockResolvedValue([1]); // Returning the number of affected rows

    const response = await request(app)
      .put('/api/files/1')
      .send({ name: 'updatedfile', size: 1024, type: 'txt', path: '/files/testfile.txt' })
      .expect(200);

    expect(response.body).toEqual(updatedFile);
    expect(File.findByPk).toHaveBeenCalledWith(1);  // Check if correct file is retrieved
    expect(File.update).toHaveBeenCalledWith(
      { name: 'updatedfile', size: 1024, type: 'txt', path: '/files/testfile.txt' }, 
      { where: { id: 1 } }
    );  // Check if update was called with correct parameters
  });

  it('should return 404 if file not found', async () => {
    File.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .put('/api/files/1')
      .send({ name: 'updatedfile', size: 1024, type: 'txt', path: '/files/testfile.txt' })
      .expect(404);

    expect(response.body).toEqual({ message: 'File not found.' });
  });

  it('should return 400 if request body is incomplete', async () => {
    const response = await request(app)
      .put('/api/files/1')
      .send({ name: 'updatedfile' })  // Missing other fields like size, type, etc.
      .expect(400);

    expect(response.body.message).toBe('All fields are required');
  });
});
