import { RoleEnum } from '../types';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({ unique: true })
  phone: string;

  @Column()
  organization: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @Column({ type: 'boolean', default: false })
  whatsappConnected?: boolean;

  @Column()
  validUntil: Date;
}
