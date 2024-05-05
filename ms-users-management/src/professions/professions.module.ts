import { TypeOrmModule } from '@nestjs/typeorm';
import { SubProfession } from './entities/sub-profession.entity';
import { Profession } from './entities/profession.entity';
import { SubProfessionsService } from './sub-professions.service';
import { Module } from '@nestjs/common';
import { ProfessionsService } from './professions.service';
import { ProfessionsController } from './professions.controller';


@Module({
  imports:[TypeOrmModule.forFeature([Profession, SubProfession]),],
  controllers: [ProfessionsController],
  providers: [ProfessionsService, SubProfessionsService],
})
export class ProfessionsModule {}
