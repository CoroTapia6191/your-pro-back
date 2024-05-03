import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

export class StatusUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsNumber()
    userUpdate: number;

}
