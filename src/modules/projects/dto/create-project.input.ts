import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { ProjectForm } from "src/entities/project-form.entity";
import { ProjectStatusEnum } from "src/types";

export class CreateProjectInput {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsIn(Object.keys(ProjectStatusEnum))
    status: ProjectStatusEnum

    @IsNotEmpty()
    projectCode: string;

    @IsArray()
    @ArrayMinSize(1)
    customerServices: string[]

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => ProjectForm)
    forms: ProjectForm[];

}