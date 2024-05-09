import { CreateTechnicianDto } from './../technician/dto/create-technician.dto';
import { TechnicianService } from './../technician/technician.service';
import { Technician } from './../technician/entities/technician.entity';
import { Customer } from './../customer/entities/customer.entity';
import { CreateCustomerDto } from './../customer/dto/create-customer.dto';
import { CustomerService } from './../customer/customer.service';
import { User } from './entities/user.entity';
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
    private customerService: CustomerService,
    private thecnicianService: TechnicianService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user: User = await this.userRepository.save(createUserDto);
      const { password, ...userWithoutPassword } = user;

      //this.sendCreationEvent(createUserDto.type, userWithoutPassword);
      //logica si se crea o no recibir el objeto
      let customerCreated: Customer;
      let technicianCreated: Technician;
      const createHeaderCusTechDto: CreateCustomerDto | CreateTechnicianDto = {
        user,
        status: true,
      };
      switch (createUserDto.type) {
        case 'customer':
          customerCreated = await this.customerService.create(
            createHeaderCusTechDto,
          );
          technicianCreated = await this.thecnicianService.create({
            user,
            status: false,
          });
          break;
        case 'technician':
          customerCreated = await this.customerService.create(
            createHeaderCusTechDto,
          );

          technicianCreated = await this.thecnicianService.create(
            createHeaderCusTechDto,
          );
          break;
      }
      const { id: customerId } = customerCreated;
      const { status: statusTechnician, id: technicianId } = technicianCreated;
      return {
        user: userWithoutPassword,
        customerId,
        technician: { technicianId, statusTechnician },
      };
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
  //por ahora no se usa
  private async sendCreationEvent(event: string, parseUser: Partial<User>) {
    const msResponse = await this.msClientTech
      .send({ cmd: `${event}_created` }, parseUser)
      .toPromise(); //retirrar deprectated cuando se actualice libreria
    console.log(msResponse);
    return msResponse;
  }
}
