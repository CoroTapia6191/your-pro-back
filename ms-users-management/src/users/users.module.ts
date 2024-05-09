import { Technician } from './../technician/entities/technician.entity';
import { TechnicianService } from './../technician/technician.service';
import { Customer } from './../customer/entities/customer.entity';
import { CustomerService } from './../customer/customer.service';
import { CustomerModule } from './../customer/customer.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Customer, Technician]),
    ClientsModule.register([
      {
        name: 'MS-TECH',
        transport: Transport.TCP,
        options: { port: Number(process.env.ms_technician_port) }, //parametrizar
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CustomerService, TechnicianService],
})
export class UsersModule {}
