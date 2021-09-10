import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Deletes all data beyond the 'Dto' of the route
      forbidNonWhitelisted: true, // Prevents you from continuing with the request if you pass some unnecessary information in the 'Dto'
      transform: true, // Converts all data received from the route into a 'Dto'
    }),
  );
  await app.listen(3000);
}
bootstrap();
