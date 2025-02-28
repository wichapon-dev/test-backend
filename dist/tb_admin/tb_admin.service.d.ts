import { TbAdmin } from './entities/tb_admin.entity';
import { Repository } from 'typeorm';
import { signupDto } from './dto/admin-signup.dto';
export declare class TbAdminService {
    private adminRepository;
    constructor(adminRepository: Repository<TbAdmin>);
    findOne(email: string): Promise<TbAdmin | undefined>;
    create(signupDto: signupDto): Promise<TbAdmin>;
    updateLastActive(adminId: number, lastActive: Date): Promise<void>;
}
