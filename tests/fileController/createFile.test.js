const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

jest.mock('../../models', () => {
  return {
    File: {
      create: jest.fn(),
    }
  };
});

describe('POST /api/files', () => {
  it('should create a new file', async () => {
    const fileData = { userId: 1, name: 'testfile', size: 1024, type: 'txt', path: '/files/testfile.txt' };
    File.create.mockResolvedValue(fileData);

    const response = await request(app)
      .post('/api/files')
      .send(fileData)
      .expect(201);

    expect(response.body).toEqual(fileData);
    expect(File.create).toHaveBeenCalledWith(fileData);
  });
});