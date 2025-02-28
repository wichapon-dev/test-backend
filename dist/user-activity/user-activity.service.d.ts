import { Repository } from 'typeorm';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
export declare class UserActivityService {
    private adminRepo;
    private lecturerRepo;
    private studentRepo;
    constructor(adminRepo: Repository<TbAdmin>, lecturerRepo: Repository<TbLecturer>, studentRepo: Repository<TbStudent>);
    getLatestUsers(): Promise<{
        online: boolean;
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        userType: string;
        lastActive: Date;
        profileImage: string;
        room: string;
        academicYear: string;
    }[]>;
    updateHeartbeat(user: any): Promise<void>;
    getRoleUsageStatistics(): Promise<{
        admin: number;
        lecturer: number;
        student: number;
    }>;
}
