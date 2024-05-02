import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({default: true})
  status: boolean;
}
