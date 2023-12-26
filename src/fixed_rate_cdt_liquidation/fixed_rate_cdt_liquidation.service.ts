import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FixedRateCdtService } from '../fixed_rate_cdt/fixed_rate_cdt.service';
import { sendFixedCdtToQueue } from '../utils/rabbitMq/rabbitMqOperations';
import { messages } from '../utils/constants/messages';
import { credentials } from 'src/utils/constants/credentials';

const { STARTING_PROCESS, ENDING_PROCESS } =
  messages.SCHEDULE_FIXED_RATE_CDT_LIQUIDATIONS_PROCESS;

const { SCHEDULE_TEST } = credentials;
@Injectable()
export class FixedRateCdtLiquidationService {
  constructor(private readonly fixedRateCdtService: FixedRateCdtService) {}

  @Cron(
    SCHEDULE_TEST
      ? CronExpression.EVERY_10_SECONDS
      : CronExpression.EVERY_DAY_AT_MIDNIGHT,
  )
  async handleCron() {
    try {
      new Logger().log(STARTING_PROCESS);
      const result =
        await this.fixedRateCdtService.findAllTodayLiquidationFixedRateCdt();

      if (result.length > 0) {
        await sendFixedCdtToQueue(result);
      }
      new Logger().log(ENDING_PROCESS);
    } catch (error) {
      new Logger().error(error);
    }
  }
}
