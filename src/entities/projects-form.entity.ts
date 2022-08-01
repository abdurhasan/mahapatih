import { ProjectFormTypeEnum } from 'src/types/project-form-type.enum';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects_form')
export class ProjectForm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fieldName: string;

  @Column()
  fieldType: ProjectFormTypeEnum;

  @Column({ nullable: true })
  textFormat: string;

  @Column({ type: 'uuid' })
  projectId: string;
}
