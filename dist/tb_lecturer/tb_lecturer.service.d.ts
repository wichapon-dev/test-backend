import { TbLecturer } from './entities/tb_lecturer.entity';
import { Repository } from 'typeorm';
import { signupDto } from './dto/lecturer-signup.dto';
export declare class TbLecturerService {
    private lecturerRepository;
    constructor(lecturerRepository: Repository<TbLecturer>);
    findOne(email: string): Promise<TbLecturer | undefined>;
    create(signupDto: signupDto): Promise<TbLecturer>;
    updateLastActive(lecturerId: number, lastActive: Date): Promise<void>;
}
