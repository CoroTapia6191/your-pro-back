import { Technician } from './entities/technician.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TechnicianService {
  constructor(
    @InjectRepository(Technician)
    private technicianRepository: Repository<Technician>,
  ) {}

  async create(createTechnicianDto: CreateTechnicianDto) {
    const technicianCreated =
      await this.technicianRepository.save(createTechnicianDto);

    return technicianCreated;
  }

  findAll() {
    return `This action returns all technician`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technician`;
  }

  update(id: number, updateTechnicianDto: UpdateTechnicianDto) {
    return `This action updates a #${id} technician`;
  }

  remove(id: number) {
    return `This action removes a #${id} technician`;
  }
}
