import { IsNotEmpty } from "class-validator";

export class SubmitInput {
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    name: string;
}