import { TbRole } from 'src/tb_role/entities/tb_role.entity';
import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
export declare class TbAdmin {
    admin_id: number;
    admin_fname: string;
    admin_lname: string;
    admin_email: string;
    admin_password: string;
    last_active: Date;
    profile_image: string;
    role: TbRole;
    comments: TbComments[];
    news: TbNew[];
}
