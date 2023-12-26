import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { messages } from '../constants/messages';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Logger } from '@nestjs/common';

const ERROR_MESSAGES = messages.ERROR_MESSAGES;

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;
      if (
        status === HttpStatus.NOT_FOUND ||
        status === HttpStatus.BAD_REQUEST
      ) {
        response.status(status).json({
          message,
        });
      } else {
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
    } else {
      this.logger.error(exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message:
          exception?.response?.data?.message ||
          exception?.data?.message ||
          exception?.message ||
          exception?.errors ||
          ERROR_MESSAGES.GENERIC_SERVER_ERROR_MESSAGE,
      });
    }
  }
}
