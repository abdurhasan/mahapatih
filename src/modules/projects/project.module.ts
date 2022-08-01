import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from 'src/entities/customer-service.entity';
import { Leads } from 'src/entities/leads.entity';
import { ProjectForm } from 'src/entities/projects-form.entity';
import { Project } from 'src/entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { LeadsForm } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectForm,
      CustomerService,
      Leads,
      LeadsForm,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
