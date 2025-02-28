import { JwtService } from '@nestjs/jwt';
import { TbStudentService } from 'src/tb_student/tb_student.service';
import { TbAdminService } from 'src/tb_admin/tb_admin.service';
import { TbLecturerService } from 'src/tb_lecturer/tb_lecturer.service';
export declare class AuthService {
    private tbStudentService;
    private tbAdminService;
    private tbLecturerService;
    private jwtService;
    constructor(tbStudentService: TbStudentService, tbAdminService: TbAdminService, tbLecturerService: TbLecturerService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
