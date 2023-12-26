import * as dotenv from 'dotenv';
dotenv.config();
export const rabbitMq = {
  RABBIT_MQ_SERVER: process.env.RABBIT_MQ_SERVER,
  FIXED_RATE_CDT_WORKER_QUEUE: process.env.FIXED_RATE_CDT_WORKER_QUEUE,
  CONNECTION_ERROR_MESSAGE: 'Connection error to RabbitMQ',
  ON_CLOSE_CONNECTION_MESSAGE: 'Connection to RabbitMQ closed"',
  CONNECTION_MESSAGE: (queueName: string, host: string): string =>
    'Connected to: [' + queueName + '] queue in [' + host + '] host',
  ENDING_SUCCESSFULLY_SCHEDULE_PROCESS:
    'The data has been inserted successfully',
};
