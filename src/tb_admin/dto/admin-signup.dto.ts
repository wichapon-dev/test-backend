import { IsNotEmpty } from "class-validator";

export class signupDto{

    @IsNotEmpty()
    admin_email: string
    
    @IsNotEmpty()
    admin_fname: string

    @IsNotEmpty()
    admin_lname: string

    @IsNotEmpty()
    admin_password: string

    role_id: number;
}