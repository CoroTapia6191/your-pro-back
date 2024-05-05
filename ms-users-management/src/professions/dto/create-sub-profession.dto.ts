import { Profession } from './../entities/profession.entity';
export class CreateSubProfessionDto {
    id: number;
    name: string;
    label: string;
    description: string;
    status: boolean;
    profession: Profession;
}
