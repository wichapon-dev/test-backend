import { IsNotEmpty } from "class-validator";

export class AuthLoginDto{
    @IsNotEmpty()
    admin_fname: string

    @IsNotEmpty()
    admin_lname: string

    @IsNotEmpty()
    admin_email: string

    @IsNotEmpty()
    admin_password: string
}