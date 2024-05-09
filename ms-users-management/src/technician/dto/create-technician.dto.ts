import { User } from './../../users/entities/user.entity';
import { IsBoolean } from 'class-validator';
import { JoinColumn, ManyToOne } from 'typeorm';

export class CreateTechnicianDto {
  @IsBoolean()
  status: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
