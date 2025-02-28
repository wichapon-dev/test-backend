import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';
import { TbFiles } from 'src/tb_files/entities/tb_file.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
export declare class TbNew {
    new_id: number;
    title: string;
    content: string;
    room: string;
    year: string;
    category: string;
    isImportant: boolean;
    comments: TbComments[];
    files: TbFiles[];
    date_last_post: Date;
    students: TbStudent;
    lecturers: TbLecturer;
    admins: TbAdmin;
    coverImage: string;
}
