import { ProjectStatusEnum } from "src/types";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectForm } from "./project-form.entity";
import { User } from "./user.entity";


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

    @ManyToMany(() => User)
    @JoinTable()
    customerServices: User[]

    @OneToMany(() => ProjectForm, (projectForm) => projectForm.project)
    forms: ProjectForm[];



}