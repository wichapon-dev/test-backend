import { UserManagementService } from './user-management.service';
export declare class UserManagementController {
    private readonly userManagementService;
    constructor(userManagementService: UserManagementService);
    getUsers(): Promise<{
        id: number;
        userType: string;
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string;
        room: any;
        academicYear: any;
    }[]>;
    createUser(file: Express.Multer.File, data: any): Promise<import("../tb_lecturer/entities/tb_lecturer.entity").TbLecturer | import("../tb_student/entities/tb_student.entity").TbStudent | import("../tb_admin/entities/tb_admin.entity").TbAdmin>;
    updateUser(id: string, userType: string, file: Express.Multer.File, data: any): Promise<import("../tb_lecturer/entities/tb_lecturer.entity").TbLecturer | import("../tb_student/entities/tb_student.entity").TbStudent | import("../tb_admin/entities/tb_admin.entity").TbAdmin>;
    deleteUser(id: string, userType: string): Promise<import("typeorm").DeleteResult>;
    getUserProfile(userType: string, id: string): Promise<{
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
