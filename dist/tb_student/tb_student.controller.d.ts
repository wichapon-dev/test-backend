import { TbStudentService } from './tb_student.service';
import { signupDto } from './dto/student-signup.dto';
export declare class TbStudentController {
    private readonly tbStudentService;
    constructor(tbStudentService: TbStudentService);
    signup(signupDto: signupDto): Promise<import("./entities/tb_student.entity").TbStudent>;
}
