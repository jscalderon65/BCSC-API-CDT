import * as amqp from 'amqplib';
import { rabbitMq } from '../constants/rabbitMq';
import { Logger } from '@nestjs/common';
import { FixedRateCdt } from '../../fixed_rate_cdt/schemas/fixed_rate_cdt.schema';

const {
  FIXED_RATE_CDT_WORKER_QUEUE,
  RABBIT_MQ_SERVER,
  CONNECTION_MESSAGE,
  CONNECTION_ERROR_MESSAGE,
  ON_CLOSE_CONNECTION_MESSAGE,
  ENDING_SUCCESSFULLY_SCHEDULE_PROCESS,
} = rabbitMq;

export const sendFixedCdtToQueue = async (
  fixedRateCdtToLiquidate: FixedRateCdt[],
) => {
  try {
    const connection = await amqp.connect(RABBIT_MQ_SERVER);
    connection.on('error', (err) => {
      new Logger().error(CONNECTION_ERROR_MESSAGE, err);
    });

    connection.on('close', () => {
      new Logger().log(ON_CLOSE_CONNECTION_MESSAGE);
    });

    const channel = await connection.createChannel();

    await channel.assertQueue(FIXED_RATE_CDT_WORKER_QUEUE, { durable: true });

    new Logger().log(
      CONNECTION_MESSAGE(FIXED_RATE_CDT_WORKER_QUEUE, RABBIT_MQ_SERVER),
    );

    for (const fixedRateCdt of fixedRateCdtToLiquidate) {
      channel.sendToQueue(
        FIXED_RATE_CDT_WORKER_QUEUE,
        Buffer.from(JSON.stringify(fixedRateCdt)),
      );
      new Logger().log(ENDING_SUCCESSFULLY_SCHEDULE_PROCESS);
    }
    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    new Logger().error(error);
  }
};
