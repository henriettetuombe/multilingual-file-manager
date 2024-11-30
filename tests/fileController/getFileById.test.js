const request = require('supertest');
const app = require('../../app');
const File = require('../../models/file');

jest.mock('../../models/file'); // Mock the File model

describe('GET /api/files/:id', () => {
  const fileId = '507f1f77bcf86cd799439012';
  const file = { id: fileId, name: 'Test File', content: 'Sample content' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a file by ID', async () => {
    // Mock resolved value for File.findByPk
    File.findByPk.mockResolvedValue(file);

    const response = await request(app)
      .get(`/api/files/${fileId}`)
      .expect(200);

    expect(response.body).toEqual(file);
    expect(File.findByPk).toHaveBeenCalledWith(fileId);
  });

  it('should return 404 if the file is not found', async () => {
    // Mock resolved value as null (file not found)
    File.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .get(`/api/files/${fileId}`)
      .expect(404);

    expect(response.body).toEqual({ message: 'File not found.' });
    expect(File.findByPk).toHaveBeenCalledWith(fileId);
  });

  it('should return 500 if there is a server error', async () => {
    // Mock rejected value (simulate server error)
    File.findByPk.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .get(`/api/files/${fileId}`)
      .expect(500);

    expect(response.body).toEqual({ message: 'Internal Server Error' });
  });
});
