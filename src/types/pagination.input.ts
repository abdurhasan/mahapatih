import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationInput {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Max(100)
  @Min(1)
  @Type(() => Number)
  limit?: number;

  total?: number;
}
