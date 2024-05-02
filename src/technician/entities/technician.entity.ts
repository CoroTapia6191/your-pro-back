import { EmbededResource } from './embeded-resource.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Technician {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  status: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  profession: string;

  @OneToMany(() => EmbededResource, embededResource => embededResource.technician)
  embededResources: EmbededResource[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate:'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
