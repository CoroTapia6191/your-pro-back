import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { port: 4000 },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.port);
  console.log('listening: ' + process.env.port);
}
bootstrap();
