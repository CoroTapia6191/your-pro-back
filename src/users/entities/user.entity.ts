import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string;

  @Column()
  urlPicture: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  status: boolean;

  @Column({ nullable: false })
  type: string;

  @Column()
  userUpdate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate:'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
