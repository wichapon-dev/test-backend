import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
export declare class TbRole {
    role_id: number;
    role_access: string;
    students: TbStudent[];
    lecturers: TbLecturer[];
    admins: TbAdmin[];
}
