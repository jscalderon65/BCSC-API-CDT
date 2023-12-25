import { Module } from '@nestjs/common';
import { FixedRateCertificatesService } from './fixed_rate_certificates.service';
import { FixedRateCertificatesController } from './fixed_rate_certificates.controller';
import { mongoDb } from '../utils/constants/mongoDb';
import { FixedRateCertificateSchema } from './schemas/fixed_rate_certificate.schema';
import { MongooseModule } from '@nestjs/mongoose';

const { FIXED_RATE_CERTIFICATES } = mongoDb.SCHEMA_NAMES;

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FIXED_RATE_CERTIFICATES, schema: FixedRateCertificateSchema },
    ]),
  ],
  controllers: [FixedRateCertificatesController],
  providers: [FixedRateCertificatesService],
  exports: [FixedRateCertificatesService],
})
export class FixedRateCertificatesModule {}
