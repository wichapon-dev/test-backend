import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
export declare class TbComments {
    comments_id: number;
    comments_detail: string;
    created_at: Date;
    students: TbStudent;
    lecturers: TbLecturer;
    admins: TbAdmin;
    news: TbNew;
}
