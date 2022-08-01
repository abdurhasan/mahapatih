import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  UseGuards,
} from '@nestjs/common';

import { ProjectService } from './project.service';

import { ConfigService } from 'src/config/config.service';
import { Public, RolesGuard } from 'src/guards';
import { CurrentUser, Roles } from 'src/decorators';
import { PaginationInput, RoleEnum } from 'src/types';
import { response, responseError } from 'src/helpers';
import { CreateProjectInput } from './dto/create-project.input';
import { User } from 'src/entities';
import { SubmitProjectLeadsInput } from './dto/submit-project-leads.input';

@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService)
    private readonly service: ProjectService,
    private readonly config: ConfigService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Management)
  @Post('createProject')
  async createProject(
    @Body() param: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    try {
      return response({
        result: await this.service.createProject(param, user),
      });
    } catch (e) {
      return responseError(e?.message);
    }
  }

  @Public()
  @Post('submitProjectLeads')
  @Redirect()
  async submitProjectLeads(@Body() param: SubmitProjectLeadsInput) {
    try {
      return await this.service.submitProjectLeads(param);
    } catch (e) {
      return responseError(e?.message);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Management)
  @Get('getProjects')
  async getProjects(
    @Query() paginationParam: PaginationInput,
    @CurrentUser() user: User,
  ) {
    try {
      return response({
        result: await this.service.getProjects(paginationParam, user),
      });
    } catch (e) {
      return responseError(e?.message);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Management)
  @Get('getProjectDetail/:projectId')
  async getProjectDetail(
    @Param('projectId') projectId: string,
    // @CurrentUser() user: User,
  ) {
    try {
      return response({
        result: await this.service.getProjectDetail(projectId),
      });
    } catch (e) {
      return responseError(e?.message);
    }
  }
}
