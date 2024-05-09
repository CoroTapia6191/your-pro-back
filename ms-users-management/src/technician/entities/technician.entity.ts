import { SubProfession } from './../../professions/entities/sub-profession.entity';
import { User } from './../../users/entities/user.entity';
import { Profession } from './../../professions/entities/profession.entity';
import { EmbededResource } from './embeded-resource.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Technician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => Profession, (profession) => profession.technician)
  @JoinTable({ name: 'technician_profession' })
  profession: Profession[];

  @ManyToMany(() => SubProfession, (subProfession) => subProfession.technicians)
  @JoinTable({ name: 'technician_sub_profession' })
  subProfession: SubProfession[];

  @OneToMany(
    () => EmbededResource,
    (embededResource) => embededResource.technician,
  )
  embededResources: EmbededResource[];

  @Column({ nullable: true })
  ranking: number;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
