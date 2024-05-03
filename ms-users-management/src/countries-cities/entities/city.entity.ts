import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  name: string;
  @ManyToOne(() => Country, { nullable: false })
  @JoinColumn({ name: 'countryid' })
  country: Country;
  @Column({ default: true })
  status: boolean;
}
