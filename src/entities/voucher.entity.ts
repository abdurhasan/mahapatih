import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('vouchers')
export class Voucher extends BaseEntity {
  @PrimaryColumn({ unique: true })
  code: string;

  @Column({ nullable: true })
  organization: string;

  @Column({ nullable: false })
  days: number;
}
