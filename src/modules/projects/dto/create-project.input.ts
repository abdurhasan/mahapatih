import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProjectStatusEnum } from 'src/types';
import { ProjectFormTypeEnum } from 'src/types/project-form-type.enum';

export class CreateProjectInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn(Object.keys(ProjectStatusEnum))
  status: ProjectStatusEnum;

  @IsNotEmpty()
  projectCode: string;

  @IsOptional()
  website: string;

  @IsArray()
  @ArrayMinSize(1)
  customerServices: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ProjectFormInsert)
  forms: ProjectFormInsert[];
}

class ProjectFormInsert {
  constructor(partial: Partial<ProjectFormInsert>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsString()
  fieldName: string;

  @IsNotEmpty()
  @IsIn(Object.keys(ProjectFormTypeEnum))
  fieldType: ProjectFormTypeEnum;

  @IsOptional()
  textFormat?: string;
}

export const defaultProjectForm: ProjectFormInsert[] = [
  new ProjectFormInsert({
    fieldName: 'name',
    fieldType: ProjectFormTypeEnum.character,
  }),
  new ProjectFormInsert({
    fieldName: 'phone',
    fieldType: ProjectFormTypeEnum.character,
  }),
];
