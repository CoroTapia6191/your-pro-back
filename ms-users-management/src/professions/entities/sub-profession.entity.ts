import { Profession } from './profession.entity';
import { Technician } from './../../technician/entities/technician.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubProfession {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @Column({ unique: true })
  label: string;
  @Column({ nullable: false })
  description: string;
  @Column({ default: true })
  status: boolean;
  @ManyToMany(() => Profession, (profession) => profession.subProfession)
  profession: Profession;
  @ManyToMany(() => Technician, (technician) => technician.subProfession)
  technicians: Technician[];
}
