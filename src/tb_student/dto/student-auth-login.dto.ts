import { IsNotEmpty } from "class-validator";

export class AuthLoginDto{
    @IsNotEmpty()
    student_fname: string

    @IsNotEmpty()
    student_lname: string

    @IsNotEmpty()
    student_email: string

    @IsNotEmpty()
    student_password: string
}