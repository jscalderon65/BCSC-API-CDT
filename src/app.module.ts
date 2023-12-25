import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/interceptors/global-exception.interceptor';
import { credentials } from './utils/constants/credentials';
import { messages } from './utils/constants/messages';

const CONNECTION_MESSAGES = messages.CONNECTION_MESSAGES;
@Module({
  imports: [
    MongooseModule.forRoot(credentials.MONGO_URI, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          new Logger().log(CONNECTION_MESSAGES.MONGO_CORRECT_CONNECTION);
        });

        connection.on('disconnected', () => {
          new Logger().log(CONNECTION_MESSAGES.MONGO_END_CONNECTION);
        });

        connection._events.connected();
        return connection;
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
