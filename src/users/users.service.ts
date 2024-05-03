import { User } from 'src/users/entities/user.entity';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user: User = await this.userRepository.save(createUserDto);
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message);

    }

  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    try {
      const user: User = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new HttpException({error: 'Error', message: 'Usuario no encontrado' }, HttpStatus.FORBIDDEN)
      }
      const { password, userUpdate, ...userDto } = user
      return userDto
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message)

    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { affected } = await this.userRepository.update(id, updateUserDto)
      if (affected == 0) {
        throw new HttpException({ error: 'Error', message: 'Usuario no encontrado' }, HttpStatus.FORBIDDEN)
      }
      return { message: `User ${id} updated` }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message)
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.userRepository.delete(id)
      if (affected == 0) {
        throw new HttpException({error: 'Error', message: 'Usuario no encontrado' }, HttpStatus.FORBIDDEN)
      }
      return { message: `User ${id} removed` }

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message)
    }
  }
}
