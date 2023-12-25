import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AllExceptionsFilter', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule(
      {},
    ).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /fake should return 404 message', async () => {
    const result = await request(app.getHttpServer()).get('/fake').expect(404);
    expect(result.body.message).toBe('Cannot GET /fake');
  });
});
