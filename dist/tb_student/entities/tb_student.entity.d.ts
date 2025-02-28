import { TbRole } from 'src/tb_role/entities/tb_role.entity';
import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { TbRoom } from 'src/tb_room/entities/tb_room.entity';
import { TbYear } from 'src/tb_year/entities/tb_year.entity';
export declare class TbStudent {
    student_id: number;
    student_fname: string;
    student_lname: string;
    student_email: string;
    student_password: string;
    last_active: Date;
    room: TbRoom;
    profile_image: string;
    year: TbYear;
    role: TbRole;
    comments: TbComments[];
    news: TbNew[];
}
