import { User } from 'src/users/entities/user.entity';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusUserDto } from './dto/disable-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('MS-TECH') private msClientTech: ClientProxy,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user: User = await this.userRepository.save(createUserDto);
      const { password, ...userWithoutPassword } = user;
      if (createUserDto.type === 'technician') {
        //solo envia
        // const techResponse = await this.msClientTech
        //   .emit('tech_created', userWithoutPassword)
        //   .toPromise(); //actualizar cuando se

        //recibe
        const techResponse = await this.msClientTech
          .send({ cmd: 'tech_created' }, userWithoutPassword)
          .toPromise(); //actualizar cuando se

        console.log(techResponse);
      }
      return userWithoutPassword;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    try {
      const user: User = await this.userRepository.findOneBy({
        id,
        status: true,
      });
      if (!user) {
        throw new HttpException(
          { error: 'Error', message: 'Usuario no encontrado' },
          HttpStatus.FORBIDDEN,
        );
      }
      const { password, userUpdate, ...userDto } = user;
      return userDto;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { affected } = await this.userRepository.update(id, updateUserDto);
      if (affected == 0) {
        throw new HttpException(
          { error: 'Error', message: 'Usuario no encontrado' },
          HttpStatus.FORBIDDEN,
        );
      }
      return { message: `Usuario ${id} actualizado` };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.userRepository.delete(id);
      if (affected == 0) {
        throw new HttpException(
          { error: 'Error', message: 'Usuario no encontrado' },
          HttpStatus.FORBIDDEN,
        );
      }
      return { message: `Usuario ${id} eliminado` };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async disableEnable(id: number, statusUserDto: StatusUserDto) {
    try {
      const { affected } = await this.userRepository.update(id, statusUserDto);
      if (affected == 0) {
        throw new HttpException(
          { error: 'Error', message: 'Usuario no encontrado' },
          HttpStatus.FORBIDDEN,
        );
      }
      const resultado = statusUserDto.status ? 'habilitado' : 'deshabilitado';
      return { message: `Usuario ${id} ${resultado}` };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
