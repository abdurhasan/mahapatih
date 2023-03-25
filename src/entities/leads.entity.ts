import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('leads')
export class Leads extends BaseEntity {

  @PrimaryColumn()
  name: string;

  @PrimaryColumn()
  phone: string;


  @Column({ name: 'is_followed_up', default: false, type: 'boolean' })
  isFollowedUp: boolean;

  @CreateDateColumn({ name : 'created_at'})
  createdAt: Date;
}
