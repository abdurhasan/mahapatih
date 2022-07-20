import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserRegisterInput {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  organization: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  voucherCode: string;
}
