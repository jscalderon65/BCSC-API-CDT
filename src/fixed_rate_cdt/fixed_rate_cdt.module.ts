import { Module } from '@nestjs/common';
import { FixedRateCdtService } from './fixed_rate_cdt.service';
import { FixedRateCdtController } from './fixed_rate_cdt.controller';
import { AxiosModule } from 'src/axios/axios.module';
import { mongoDb } from '../utils/constants/mongoDb';
import { FixedRateCertificatesModule } from '../fixed_rate_certificates/fixed_rate_certificates.module';
import { FixedRateCdtSchema } from '../fixed_rate_cdt/schemas/fixed_rate_cdt.schema';
import { MongooseModule } from '@nestjs/mongoose';

const { FIXED_RATE_CDT } = mongoDb.SCHEMA_NAMES;

@Module({
  imports: [
    FixedRateCertificatesModule,
    AxiosModule,
    MongooseModule.forFeature([
      { name: FIXED_RATE_CDT, schema: FixedRateCdtSchema },
    ]),
  ],
  controllers: [FixedRateCdtController],
  providers: [FixedRateCdtService],
})
export class FixedRateCdtModule {}
