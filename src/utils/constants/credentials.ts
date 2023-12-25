import * as dotenv from 'dotenv';
dotenv.config();

export const credentials = {
  MONGO_URI: process.env.MONGO_HOST + '/' + process.env.MONGO_DB,
  MONGO_DB: process.env.MONGO_DB,
  PORT: process.env.PORT,
};
