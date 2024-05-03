import { EmbededResource } from './technician/entities/embeded-resource.entity';
import { Technician } from './technician/entities/technician.entity';
import { Customer } from './customer/entities/customer.entity';
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
import { CustomerModule } from './customer/customer.module';
import { TechnicianModule } from './technician/technician.module';
import { User } from './users/entities/user.entity';


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
      entities: [Profession, City, Country, User, Customer, Technician, EmbededResource],
      synchronize: true
    }),
    ProfessionsModule,
    UsersModule,
    CustomerModule,
    TechnicianModule,  
  ],
  controllers: [AppController],
  providers: [AppService, PlacesServiceService],
})
export class AppModule {

}
