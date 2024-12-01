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

describe('PUT /api/files/:id', () => {
  it('should update a file', async () => {
    const file = { id: 1, name: 'testfile', size: 1024, type: 'txt', path: '/files/testfile.txt' };
    const updatedFile = { ...file, name: 'updatedfile' };
    File.findByPk.mockResolvedValue(file);
    file.save = jest.fn().mockResolvedValue(updatedFile);

    const response = await request(app)
      .put('/api/files/1')
      .send({ name: 'updatedfile', size: 1024, type: 'txt', path: '/files/testfile.txt' })
      .expect(200);

    expect(response.body).toEqual(updatedFile);
    expect(File.findByPk).toHaveBeenCalledWith(1); // No need for Number("1") here
  });

  it('should return 404 if file not found', async () => {
    File.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .put('/api/files/1')
      .send({ name: 'updatedfile', size: 1024, type: 'txt', path: '/files/testfile.txt' })
      .expect(404);

    expect(response.body).toEqual({ message: 'File not found.' });
  });
});