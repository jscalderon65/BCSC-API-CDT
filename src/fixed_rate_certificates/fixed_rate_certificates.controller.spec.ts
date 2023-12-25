import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/testDb/mongodb-in-memory';
import { FixedRateCertificateDocument } from './schemas/fixed_rate_certificate.schema';
import { mongoDb } from '../utils/constants/mongoDb';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateFixedRateCertificatesStub } from '../utils/stubs/fixedRateCertificates.stub';
import { FixedRateCertificatesModule } from './fixed_rate_certificates.module';

const { FIXED_RATE_CERTIFICATES } = mongoDb.SCHEMA_NAMES;

let app;
let fixedRateCertificateModel: Model<FixedRateCertificateDocument>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [rootMongooseTestModule(), FixedRateCertificatesModule],
  }).compile();

  fixedRateCertificateModel = moduleFixture.get<
    Model<FixedRateCertificateDocument>
  >(getModelToken(FIXED_RATE_CERTIFICATES));

  app = moduleFixture.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await closeInMongodConnection();
  await app.close();
});

describe('FixedRateCertificatesController', () => {
  describe('Controller status test', () => {
    it('POST /fixed-rate-certificates should return 201', async () => {
      const newFixedRateCertificate = CreateFixedRateCertificatesStub();
      const result = await request(app.getHttpServer())
        .post('/fixed-rate-certificates')
        .send(newFixedRateCertificate)
        .expect(201);

      expect(result.body.to).toBe(newFixedRateCertificate.to);
    });

    it('GET /fixed-rate-certificates should return 200', async () => {
      await fixedRateCertificateModel.insertMany([
        CreateFixedRateCertificatesStub(),
        CreateFixedRateCertificatesStub(),
      ]);
      const result = await request(app.getHttpServer())
        .get('/fixed-rate-certificates')
        .expect(200);

      const allNewFixedRateCertificates =
        await fixedRateCertificateModel.find();
      expect(result.body.length).toBe(allNewFixedRateCertificates.length);
    });
    it('GET /fixed-rate-certificates/:id should return 200', async () => {
      const newFixedRateCertificate = await fixedRateCertificateModel.create(
        CreateFixedRateCertificatesStub(),
      );

      const id = newFixedRateCertificate._id;

      await request(app.getHttpServer())
        .get('/fixed-rate-certificates/' + id)
        .expect(200);
    });

    it('PATCH /fixed-rate-certificates/:id should return 200', async () => {
      const baseDocumentStub = CreateFixedRateCertificatesStub();
      const newFixedRateCertificate =
        await fixedRateCertificateModel.create(baseDocumentStub);

      const id = newFixedRateCertificate._id;

      const result = await request(app.getHttpServer())
        .patch('/fixed-rate-certificates/' + id)
        .send({ to: CreateFixedRateCertificatesStub().to })
        .expect(200);

      expect(id).not.toBe(result.body._id);

      expect(baseDocumentStub.to).not.toBe(result.body.to);
    });

    it('DELETE /fixed-rate-certificates/:id should return 200', async () => {
      const newFixedRateCertificate = await fixedRateCertificateModel.create(
        CreateFixedRateCertificatesStub(),
      );

      const id = newFixedRateCertificate._id;

      await request(app.getHttpServer())
        .delete('/fixed-rate-certificates/' + id)
        .expect(200);

      const verification = await fixedRateCertificateModel.findById(id);

      expect(verification).toBeNull();
    });
  });
});
