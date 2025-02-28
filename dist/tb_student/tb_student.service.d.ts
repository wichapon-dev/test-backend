import { Repository } from 'typeorm';
import { TbStudent } from './entities/tb_student.entity';
import { signupDto } from './dto/student-signup.dto';
export declare class TbStudentService {
    private studentRepository;
    constructor(studentRepository: Repository<TbStudent>);
    findOne(student_email: string): Promise<TbStudent | undefined>;
    create(signupDto: signupDto): Promise<TbStudent>;
    updateLastActive(studentId: number, lastActive: Date): Promise<void>;
}
