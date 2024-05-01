import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  name: string;
  @Column({default: true})
  status: boolean;
}
