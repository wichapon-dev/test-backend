import { Repository } from 'typeorm';
import { TbNew } from './entities/tb_new.entity';
import { CreateTbNewDto } from './dto/create-tb_new.dto';
import { TbFiles } from 'src/tb_files/entities/tb_file.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { UpdateTbNewDto } from './dto/update-tb_new.dto';
import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';
export declare class TbNewsService {
    private readonly newsRepository;
    private readonly studentRepository;
    private readonly filesRepository;
    private readonly commentsRepository;
    constructor(newsRepository: Repository<TbNew>, studentRepository: Repository<TbStudent>, filesRepository: Repository<TbFiles>, commentsRepository: Repository<TbComments>);
    find(filter: any): Promise<TbNew[]>;
    findNewNews(): Promise<TbNew[]>;
    findImportant(): Promise<TbNew[]>;
    findNewsScholarShip(): Promise<TbNew[]>;
    findNewsActivity(): Promise<TbNew[]>;
    findNewNewsAll(studentRoom: string, studentYear: string): Promise<TbNew[]>;
    findNewsImportantRoomAll(studentRoom: string, studentYear: string): Promise<TbNew[]>;
    findNewsInClassAll(studentRoom: string, studentYear: string): Promise<TbNew[]>;
    findNewsActivityAll(studentRoom: string, studentYear: string): Promise<TbNew[]>;
    findNewsScholarShipAll(studentRoom: string, studentYear: string): Promise<TbNew[]>;
    findGlobalAndMyNews(user: any): Promise<TbNew[]>;
    findImportantGlobalAndMyNews(user: any): Promise<TbNew[]>;
    findActivityGlobalAndMyNews(user: any): Promise<TbNew[]>;
    findScholarshipGlobalAndMyNews(user: any): Promise<TbNew[]>;
    findMyNews(user: any): Promise<TbNew[]>;
    searchNews(keyword: string): Promise<TbNew[]>;
    findNewsByUser(userType: string, userId: number, viewerRoom?: string, viewerYear?: string): Promise<TbNew[]>;
    findNewsById(newId: number): Promise<TbNew>;
    findAdminNews(): Promise<TbNew[]>;
    create(createTbNewDto: CreateTbNewDto, user: any): Promise<TbNew>;
    adminUpdateNews(newId: number, updateDto: UpdateTbNewDto): Promise<TbNew>;
    updateNews(newId: number, updateDto: UpdateTbNewDto): Promise<TbNew>;
    deleteNewsAndAssociations(newId: number): Promise<void>;
    adminDeleteNews(newId: number): Promise<{
        message: string;
    }>;
    deleteNews(newId: number): Promise<{
        message: string;
    }>;
    uploadCoverImage(newsId: number, filePath: string): Promise<void>;
}
