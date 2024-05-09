import { User } from './../../users/entities/user.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';
export class CreateCustomerDto {
  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
