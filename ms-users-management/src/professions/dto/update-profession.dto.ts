import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { SubProfession } from '../entities/sub-profession.entity';
import { CreateProfessionDto } from './create-profession.dto';

export class UpdateProfessionDto extends PartialType(CreateProfessionDto) {
    @IsOptional()
    subProfession?: SubProfession[];
}
