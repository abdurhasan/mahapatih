import { IsNotEmpty } from 'class-validator';

export class AddCustomerServiceInput {
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
