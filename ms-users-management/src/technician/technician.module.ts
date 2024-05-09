import { TypeOrmModule } from '@nestjs/typeorm';
import { Technician } from './entities/technician.entity';
import { Module } from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { TechnicianController } from './technician.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Technician])],
  controllers: [TechnicianController],
  providers: [TechnicianService],
})
export class TechnicianModule {}
