import { CreateSubProfessionDto } from './dto/create-sub-profession.dto';
import { SubProfession } from './entities/sub-profession.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class SubProfessionsService {
  constructor(
    @InjectRepository(SubProfession)
    private SubProfessionRepository: Repository<SubProfession>,
  ) {}

  create(createSubProfessionDto: CreateSubProfessionDto) {
    this.SubProfessionRepository.save(createSubProfessionDto);
  }

  findAll() {
    return `This action returns all SubProfessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} SubProfession`;
  }

  // update(id: number, updateSubProfessionDto: UpdateSubProfessionDto) {
  //   return `This action updates a #${id} SubProfession`;
  // }

  remove(id: number) {
    return `This action removes a #${id} SubProfession`;
  }
}
