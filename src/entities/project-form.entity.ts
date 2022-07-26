import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ProjectFormTypeEnum } from "src/types/project-form-type.enum";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";

@Entity('project_form')
export class ProjectForm extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsNotEmpty()
    @Column()
    fieldName: string;

    @Column()
    @IsNotEmpty()
    @IsIn(Object.keys(ProjectFormTypeEnum))
    fieldType: ProjectFormTypeEnum;

    @Column({ nullable: true })
    @IsOptional()
    textFormat?: string;


    @ManyToOne(() => Project, (project) => project.forms)    
    project: Project

}