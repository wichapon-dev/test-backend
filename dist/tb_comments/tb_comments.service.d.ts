import { Repository } from 'typeorm';
import { TbComments } from './entities/tb_comment.entity';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { CreateTbCommentDto } from './dto/create-tb_comment.dto';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
export declare class TbCommentsService {
    private readonly commentsRepository;
    private readonly studentRepository;
    private readonly lecturerRepository;
    private readonly adminRepository;
    private readonly newsRepository;
    constructor(commentsRepository: Repository<TbComments>, studentRepository: Repository<TbStudent>, lecturerRepository: Repository<TbLecturer>, adminRepository: Repository<TbAdmin>, newsRepository: Repository<TbNew>);
    findNews(newsId: number): Promise<TbComments[]>;
    create(createCommentDto: CreateTbCommentDto, user: any): Promise<TbComments>;
}
