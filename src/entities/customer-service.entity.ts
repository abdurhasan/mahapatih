import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_services')
export class CustomerService extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone: string;

  @Column({ type: 'uuid' })
  projectId: string;

  @Column({ type: 'boolean', default: false })
  handlingLeads: boolean;
}
