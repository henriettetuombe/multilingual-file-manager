const request = require('supertest');
const app = require('../../app');
const { File } = require('../../models');

jest.mock('../../models', () => {
  return {
    File: {
      findByPk: jest.fn(),
      destroy: jest.fn()
    }
  };
});

describe('DELETE /api/files/:id', () => {
  it('should delete a file', async () => {
    const file = { id: 1, name: 'testfile', size: 1024, type: 'txt', path: '/files/testfile.txt' };
    File.findByPk.mockResolvedValue(file);
    file.destroy = jest.fn().mockResolvedValue();

    const response = await request(app)
      .delete('/api/files/1')
      .expect(204);

    expect(File.findByPk).toHaveBeenCalledWith(1); // No need for Number("1") here
    expect(file.destroy).toHaveBeenCalled();
  });

  it('should return 404 if file not found', async () => {
    File.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .delete('/api/files/1')
      .expect(404);

    expect(response.body).toEqual({ message: 'File not found.' });
  });
});
