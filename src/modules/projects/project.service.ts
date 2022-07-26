import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectForm, User } from 'src/entities';
import { Project } from 'src/entities/project.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateProjectInput } from './dto/create-project.input';
import * as isEmpty from 'is-empty';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepo: Repository<Project>,
        @InjectRepository(ProjectForm)
        private readonly formRepo: Repository<ProjectForm>,
    ) { }


    async createProject(
        { projectCode, customerServices, ...param }: CreateProjectInput,
        { organization }: User,
    ) {
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const validateProjectCode = await queryRunner.manager.findOne(Project, { projectCode })
            if (!isEmpty(validateProjectCode)) {
                throw new Error(`project code ${projectCode} ald exist!`)
            }

            const customerServiceOrganizations: User[] = await queryRunner.manager.find(User, { organization })

            const listOrganizationCs: string[] = customerServiceOrganizations.map(cs => cs.phone)
            const validateCustomerServiceParam: string = customerServices.find(assignedCs => !listOrganizationCs.includes(assignedCs))
            if (!isEmpty(validateCustomerServiceParam)) {
                throw new Error(`${validateCustomerServiceParam} is not found on customer's service database`);
            }


            const project = new Project()
            project.customerServices = customerServiceOrganizations;
            project.name = param.name;
            project.status = param.status;
            project.forms = await this.formRepo.save(param.forms)

            await queryRunner.manager.save(project)

            await queryRunner.commitTransaction();

        } catch (err) {
            Logger.error(err?.message, err?.stack, '[ProjectService][createProject]');
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction()
            }

            throw err;
        } finally {
            await queryRunner.release();
        }
    }

}
