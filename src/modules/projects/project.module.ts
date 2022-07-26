import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectForm } from 'src/entities/project-form.entity';
import { Project } from 'src/entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService, } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectForm]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule { }
