import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( 
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );
  await app.listen(process.env.port);
  console.log('listening: '+ process.env.port)
}
bootstrap();
