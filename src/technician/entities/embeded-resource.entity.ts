import { Technician } from './technician.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class EmbededResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  label: string;

  @Column({nullable: false})
  url: string;

  @Column()
  description: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  type: 'video' | 'image';

  @ManyToOne(() => Technician, technician => technician.embededResources)
  technician: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate:'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}