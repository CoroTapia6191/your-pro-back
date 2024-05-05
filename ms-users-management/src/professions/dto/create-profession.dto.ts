import { SubProfession } from 'src/professions/entities/sub-profession.entity';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
export class CreateProfessionDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  label: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  subProfession: SubProfession[]

}
