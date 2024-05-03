import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsString()
    names: string;

    @IsOptional()
    @IsString()
    urlPicture: string;

    @IsNotEmpty()
    @IsString()
    type: 'customer' | 'technician';

    @IsOptional()
    @IsNumber()
    userUpdate: number;

}
