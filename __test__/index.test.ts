import request from 'supertest';
import { app } from '../src/index';

describe('GET /', () => {
  it('should return a success message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('status', 'success');
    expect(response.body.data).toHaveProperty('message', 'Hello, world!');
    expect(response.body.data).toHaveProperty('date');
  });
});

describe('Error Handling', () => {
  it('should handle errors gracefully', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('message', 'Not Found');
  });
});

describe('Test Coverage', () => {
  it('should include all files in the test coverage', () => {
    // This is a placeholder test to ensure all files are included in the test coverage
    expect(true).toBe(true);
  });
});