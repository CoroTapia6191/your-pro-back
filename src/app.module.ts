import { Profession } from './professions/entities/profession.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionsModule } from './professions/professions.module';
import { City } from './countries-cities/entities/city.entity';
import { Country } from './countries-cities/entities/country.entity';
import { PlacesServiceService } from './countries-cities/places-service.service';
import { UsersModule } from './users/users.module';

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

      entities: [Profession, City, Country],
      synchronize: true
    }),
    ProfessionsModule,
    UsersModule,
  
  ],
  controllers: [AppController],
  providers: [AppService, PlacesServiceService],
})
export class AppModule {

}

/**
base_host='aucorpec.com'
database='yourprodb'
usr_db='yourPro'
usr_pass='yourPro+-'
port_db = '3306'
*/