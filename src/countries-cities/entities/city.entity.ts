import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  name: string;
  @ManyToOne(()=>Country, country => country)
  country: Country
  @Column({default: true})
  status: boolean;
}