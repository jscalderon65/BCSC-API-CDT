// axios.module.ts
import { Module } from '@nestjs/common';
import axios from 'axios';
import { credentials } from '../utils/constants/credentials';

const { CLIENT_AXIOS_INSTANCE, URL_CLIENT_SERVICE } = credentials;

@Module({
  providers: [
    {
      provide: CLIENT_AXIOS_INSTANCE,
      useValue: axios.create({
        baseURL: URL_CLIENT_SERVICE,
        timeout: 5000,
      }),
    },
  ],
  exports: [CLIENT_AXIOS_INSTANCE],
})
export class AxiosModule {}
