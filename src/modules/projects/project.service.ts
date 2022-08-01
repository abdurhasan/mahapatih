import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadsForm, ProjectForm, User } from 'src/entities';
import { Project } from 'src/entities/project.entity';
import { getConnection, Repository } from 'typeorm';
import {
  CreateProjectInput,
  defaultProjectForm,
} from './dto/create-project.input';
import * as isEmpty from 'is-empty';
import { CustomerService } from 'src/entities/customer-service.entity';
import { BaseResponse, PaginationInput } from 'src/types';
import { createPaginationOptions } from 'src/helpers';
import { SubmitProjectLeadsInput } from './dto/submit-project-leads.input';
import { JwtService } from '@nestjs/jwt';
import { Leads } from 'src/entities/leads.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
    @InjectRepository(ProjectForm)
    private readonly projectFormRepo: Repository<ProjectForm>,
    @InjectRepository(CustomerService)
    private readonly csRepo: Repository<CustomerService>,
    @InjectRepository(Leads)
    private readonly leadsRepo: Repository<Leads>,
    @InjectRepository(LeadsForm)
    private readonly leadsFormRepo: Repository<LeadsForm>,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async createProject(
    { projectCode, customerServices, forms, ...param }: CreateProjectInput,
    { organization }: User,
  ) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const validateProjectCode = await queryRunner.manager.findOne(Project, {
        projectCode,
      });
      if (!isEmpty(validateProjectCode)) {
        throw new Error(`project code ${projectCode} already exist!`);
      }

      const customerServiceOrganizations: User[] =
        await queryRunner.manager.find(User, { organization });

      const listOrganizationCs: string[] = customerServiceOrganizations.map(
        (cs) => cs.phone,
      );
      const validateCustomerServiceParam: string = customerServices.find(
        (assignedCs) => !listOrganizationCs.includes(assignedCs),
      );
      if (!isEmpty(validateCustomerServiceParam)) {
        throw new Error(
          `${validateCustomerServiceParam} is not found on customer's service database`,
        );
      }

      const newProject = await queryRunner.manager.save(Project, {
        ...param,
        projectCode,
        organization,
      });

      const assignedCustomerServices = customerServices.map((phone) => ({
        phone,
        projectId: newProject.id,
      }));

      forms.push(...defaultProjectForm);
      const addProjectForms = forms.map((formSnap) => ({
        ...formSnap,
        projectId: newProject.id,
      }));

      await queryRunner.manager.insert(
        CustomerService,
        assignedCustomerServices,
      );
      await queryRunner.manager.insert(ProjectForm, addProjectForms);

      await queryRunner.commitTransaction();

      return { success: true };
    } catch (err) {
      Logger.error(err?.message, err?.stack, '[ProjectService][createProject]');
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }

      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getProjects(paginationParam: PaginationInput, { organization }: User) {
    try {
      const { limit, offset, page } = createPaginationOptions(paginationParam);

      const [data, total] = await this.projectRepo
        .createQueryBuilder('project')
        .leftJoinAndMapMany(
          'project.customerServices',
          CustomerService,
          'customerServices',
          'customerServices.projectId = project.id',
        )
        .where('project.organization = :organization', { organization })
        .orderBy('project.createdAt', 'DESC')
        .limit(limit)
        .offset(offset)
        .getManyAndCount();

      return {
        data,
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getProjectDetail(projectId: string) {
    try {
      const project = await this.projectRepo.findOne(projectId);

      return {
        ...project,
        token: await this.jwtService.signAsync({ projectId }),
      };
    } catch (error) {
      throw error;
    }
  }

  async submitProjectLeads({
    projectId,
    ...leadsParam
  }: SubmitProjectLeadsInput) {
    try {
      const project = await this.projectRepo
        .createQueryBuilder('project')
        .leftJoinAndMapMany(
          'project.forms',
          ProjectForm,
          'form',
          'form.projectId = project.id',
        )
        .getOne();

      if (isEmpty(project)) {
        throw new Error('project not found');
      }

      let availableCs = await this.csRepo.findOne({
        where: { projectId, handlingLeads: false },
      });

      if (isEmpty(availableCs)) {
        await this.csRepo.update({ projectId }, { handlingLeads: false });
        availableCs = await this.csRepo.findOne();
      }

      await this.csRepo.update({ id: availableCs.id }, { handlingLeads: true });

      const newLeads = await this.leadsRepo.save({ ...leadsParam, projectId });

      const newLeadsForm = project?.forms.map(({ id: formId }) => ({
        formId,
        leadsId: newLeads.id,
      }));

      await this.leadsFormRepo.save(newLeadsForm);

      return {
        url: `https://api.whatsapp.com/send?phone=${availableCs.phone}&text=${project.redirectText}`,
      };
    } catch (error) {
      throw error;
    }
  }
}
