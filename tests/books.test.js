import request from 'supertest';
import app from '../src/index.js';  // Adjust the path if necessary

describe('Book Store API', () => {
  it('should fetch all books from the /books endpoint', async () => {
    const response = await request(app).get('/books').set('Authorization', 'Bearer <your-jwt-token>');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
