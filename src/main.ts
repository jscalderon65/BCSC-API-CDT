import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { credentials } from './utils/constants/credentials';
import { messages } from './utils/constants/messages';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';

const ABOUT = messages.ABOUT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('cdt_manager');
  const options = new DocumentBuilder()
    .setTitle(ABOUT.API_TITLE)
    .setDescription(ABOUT.API_DESCRIPTION)
    .setVersion(ABOUT.SWAGGER_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(ABOUT.SWAGGER_ROUTE, app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(JSON.stringify(result));
      },
    }),
  );
  process.env.TZ = credentials.TIME_ZONE;
  await app.listen(credentials.PORT);
  new Logger().log(
    'App running on port: ' +
      credentials.PORT +
      ' and TZ: ' +
      credentials.TIME_ZONE,
  );
}
bootstrap();
