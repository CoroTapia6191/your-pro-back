import { SubProfession } from './sub-profession.entity';
import { Technician } from './../../technician/entities/technician.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profession {
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
  @ManyToMany(() => Technician, (technician) => technician.profession)
  technician: Technician[];
  @ManyToMany(() => SubProfession, (subProfession) => subProfession.profession)
  @JoinTable({name: 'profession_sub_profession'})
  subProfession: SubProfession[];
}
