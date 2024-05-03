import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    names: string;

    @IsOptional()
    @IsString()
    urlPicture: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsBoolean()
    status: boolean;

    @IsNotEmpty()
    @IsString()
    type: 'customer' | 'technician';

    @IsOptional()
    @IsNumber()
    userUpdate: number;

}
