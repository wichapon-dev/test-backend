import { IsNotEmpty } from "class-validator";

export class signupDto{

    @IsNotEmpty()
    student_email: string
    
    @IsNotEmpty()
    student_fname: string

    @IsNotEmpty()
    student_lname: string

    @IsNotEmpty()
    student_password: string

    role_id: number;

    room_id: number;

    year_id: number;
}