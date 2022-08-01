import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class SubmitProjectLeadsInput {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  lat?: number;

  @IsOptional()
  long?: number;
}
