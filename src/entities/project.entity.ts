import { ProjectStatusEnum } from 'src/types';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectForm } from './projects-form.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ProjectStatusEnum })
  status: ProjectStatusEnum;

  @Column({ unique: true })
  projectCode: string;

  @Column()
  organization: string;

  @Column()
  redirectText: string;

  @CreateDateColumn()
  createdAt: Date;

  forms?: ProjectForm[];
}
