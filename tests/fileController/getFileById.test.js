const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

jest.mock('../../models', () => {
  return {
    File: {
      findByPk: jest.fn(),
    }
  };
});

describe('GET /api/files/:id', () => {
  it('should get a file by id', async () => {
    const file = { id: 1, name: 'testfile', size: 1024, type: 'txt', path: '/files/testfile.txt' };
    File.findByPk.mockResolvedValue(file);

    const response = await request(app)
      .get('/api/files/1')
      .expect(200);

    expect(response.body).toEqual(file);
    expect(File.findByPk).toHaveBeenCalledWith(1); // No need for Number("1") here
  });

  it('should return 404 if file not found', async () => {
    File.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .get('/api/files/1')
      .expect(404);

    expect(response.body).toEqual({ message: 'File not found.' });
  });
});