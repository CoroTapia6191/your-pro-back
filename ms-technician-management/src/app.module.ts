import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.base_host,
      port: Number(process.env.port_db),
      username: process.env.usr_db,
      password: process.env.usr_pass,
      database: process.env.database,
      //logging: true,
      entities: [],
      synchronize: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
