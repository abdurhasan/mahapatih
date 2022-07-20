import { IsNotEmpty } from 'class-validator';

export class UserLoginInput {
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  password: string;
}
