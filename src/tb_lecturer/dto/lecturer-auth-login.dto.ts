import { IsNotEmpty } from "class-validator";

export class AuthLoginDto{
    @IsNotEmpty()
    lecturer_fname: string

    @IsNotEmpty()
    lecturer_lname: string

    @IsNotEmpty()
    lecturer_email: string

    @IsNotEmpty()
    lecturer_password: string
}