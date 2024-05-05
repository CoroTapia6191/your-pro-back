import { SubProfession } from 'src/professions/entities/sub-profession.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profession } from './entities/profession.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';

@Injectable()
export class ProfessionsService {
  constructor(
    @InjectRepository(Profession)
    private professionRepository: Repository<Profession>,
    @InjectRepository(SubProfession)
    private subprofessionRepository: Repository<SubProfession>,
  ) {}

  create(createProfessionDto: CreateProfessionDto) {
    // //insert data test
    // const prof1: CreateProfessionDto = {
    //   name: 'Arte',
    //   label: 'Artes',
    //   description: 'Música, pintura, danza, etc',
    //   status: true,
    // };
    // this.professionRepository.save(prof1);
    // const prof2: CreateProfessionDto = {
    //   name: 'Construcción',
    //   label: 'Construcción',
    //   description: 'Arquitectura, edificaciones, ingeniería, etc',
    //   status: true,
    //   subProfession :{
    //   }
    // };
    // this.professionRepository.save(prof2);
  }

  findAll() {
    return `This action returns all professions`;
  }

  findOne(id: number) {}

  async update(id: number, updateProfessionDto: UpdateProfessionDto) {
    try {
      const sub = await this.subprofessionRepository.findOneBy({ id: 1 });
      const prueba: UpdateProfessionDto = {
        subProfession: [sub],
      };
      const { affected } = await this.professionRepository.update(
        id,
        updateProfessionDto,
      );

      return { message: `Usuario ${id} actualizado` };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }

    return `This action updates a #${id} profession`;
  }

  remove(id: number) {
    return `This action removes a #${id} profession`;
  }
}
