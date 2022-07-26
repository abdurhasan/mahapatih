import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { ProjectService } from './project.service';

import { ConfigService } from 'src/config/config.service';
import { RolesGuard } from 'src/guards';
import { CurrentUser, Roles } from 'src/decorators';
import { RoleEnum } from 'src/types';
import { responseError } from 'src/helpers';
import { CreateProjectInput } from './dto/create-project.input';
import { User } from 'src/entities';

@Controller('project')
export class ProjectController {
    constructor(
        @Inject(ProjectService)
        private readonly service: ProjectService,
        private readonly config: ConfigService,

    ) { }

    @UseGuards(RolesGuard)
    @Roles(RoleEnum.Management)
    @Post('createProject')
    async createProject(
        @Body() param: CreateProjectInput,
        @CurrentUser() user: User,
    ) {
        try {
            return await this.service.createProject(param, user);
        } catch (e) {
            return responseError(e?.message);
        }
    }




}
