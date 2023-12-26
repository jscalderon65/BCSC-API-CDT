import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FixedRateCdtLiquidationService } from './fixed_rate_cdt_liquidation.service';
import { FixedRateCdtModule } from '../fixed_rate_cdt/fixed_rate_cdt.module';
import { AxiosModule } from 'src/axios/axios.module';

@Module({
  imports: [ScheduleModule.forRoot(), FixedRateCdtModule, AxiosModule],
  providers: [FixedRateCdtLiquidationService],
  exports: [FixedRateCdtLiquidationService],
})
export class FixedRateCdtLiquidationModule {}
