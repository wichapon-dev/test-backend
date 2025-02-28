import { Repository } from 'typeorm';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
export declare class UserManagementService {
    private adminRepository;
    private lecturerRepository;
    private studentRepository;
    constructor(adminRepository: Repository<TbAdmin>, lecturerRepository: Repository<TbLecturer>, studentRepository: Repository<TbStudent>);
    getAllUsers(): Promise<{
        id: number;
        userType: string;
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string;
        room: any;
        academicYear: any;
    }[]>;
    createUser(data: any): Promise<TbLecturer | TbStudent | TbAdmin>;
    private deleteOldFile;
    updateUser(id: number, userType: string, data: any): Promise<TbLecturer | TbStudent | TbAdmin>;
    deleteUser(id: number, userType: string): Promise<import("typeorm").DeleteResult>;
    getUserProfile(id: number, userType: string): Promise<{
        id: number;
        userType: string;
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string;
        room?: undefined;
        academicYear?: undefined;
    } | {
        id: number;
        userType: string;
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string;
        room: string;
        academicYear: string;
    }>;
}
