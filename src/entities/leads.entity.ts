import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('leads')
export class Leads extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  projectId: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  lat?: number;

  @Column({ nullable: true })
  long?: number;

  @CreateDateColumn()
  createdAt: Date;
}
