const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

// Mock File model
jest.mock('../../models', () => {
  return {
    File: {
      findAll: jest.fn(),
    },
  };
});

describe('GET /api/files', () => {
  it('should return all files', async () => {
    const files = [
      {
        _id: '507f1f77bcf86cd799439011',
        name: 'testfile.txt',
        size: 1024,
        type: 'txt',
        path: '/files/testfile.txt',
        createdAt: '2024-11-30T12:00:00Z',
        updatedAt: '2024-11-30T12:00:00Z',
      },
    ];

    File.findAll.mockResolvedValue(files);

    const response = await request(app)
      .get('/api/files')
      .expect(200);

    expect(response.body).toEqual(files);
    expect(File.findAll).toHaveBeenCalled();
  });

  it('should return 500 if there is a server error', async () => {
    File.findAll.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .get('/api/files')
      .expect(500);

    expect(response.body.message).toBe('Error retrieving files');
    expect(File.findAll).toHaveBeenCalled();
  });
});
