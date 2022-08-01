import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('leads_form')
export class LeadsForm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  leadsId: string;

  @Column({ type: 'uuid' })
  formId: string;

  @Column({ default: '' })
  valueString: string;

  @Column({ type: 'boolean', default: false })
  valueBoolean: boolean;
}
