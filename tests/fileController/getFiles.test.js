const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

jest.mock('../../models', () => {
  return {
    File: {
      findAll: jest.fn(),
    }
  };
});

describe('GET /api/files', () => {
  it('should get all files', async () => {
    const files = [{ id: 1, name: 'testfile', size: 1024, type: 'txt', path: '/files/testfile.txt' }];
    File.findAll.mockResolvedValue(files);

    const response = await request(app)
      .get('/api/files')
      .expect(200);

    expect(response.body).toEqual(files);
    expect(File.findAll).toHaveBeenCalled();
  });
});
