const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

// Mock File model
jest.mock('../../models', () => {
  return {
    File: {
      findByPk: jest.fn(),
    },
  };
});

describe('DELETE /api/files/:id', () => {
  it('should delete a file if it exists', async () => {
    const fileId = '507f1f77bcf86cd799439011'; // Mock MongoDB ObjectId for the file
    const file = {
      _id: fileId,
      name: 'testfile.txt',
      size: 1024,
      type: 'txt',
      path: '/files/testfile.txt',
      destroy: jest.fn().mockResolvedValue(), // Mock the destroy method
    };

    File.findByPk.mockResolvedValue(file);

    const response = await request(app)
      .delete(`/api/files/${fileId}`)
      .expect(204); // No content

    expect(File.findByPk).toHaveBeenCalledWith(fileId); // Ensure the correct ID is passed
    expect(file.destroy).toHaveBeenCalled();
  });

  it('should return 404 if the file does not exist', async () => {
    const fileId = '507f1f77bcf86cd799439012'; // Mock file ID for non-existing file

    File.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .delete(`/api/files/${fileId}`)
      .expect(404);

    expect(response.body).toEqual({ message: 'File not found.' });
    expect(File.findByPk).toHaveBeenCalledWith(fileId);
  });

  it('should return 500 if there is a server error', async () => {
    const fileId = '507f1f77bcf86cd799439013'; // Mock file ID
    File.findByPk.mockRejectedValue(new Error('Database error')); // Simulate server error

    const response = await request(app)
      .delete(`/api/files/${fileId}`)
      .expect(500);

    expect(response.body.message).toBe('Error deleting file');
    expect(File.findByPk).toHaveBeenCalledWith(fileId);
  });
});
