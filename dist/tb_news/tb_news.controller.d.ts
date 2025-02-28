import { TbNewsService } from './tb_news.service';
import { CreateTbNewDto } from './dto/create-tb_new.dto';
import { TbNew } from './entities/tb_new.entity';
import { Response } from 'express';
import { UpdateTbNewDto } from './dto/update-tb_new.dto';
export declare class TbNewsController {
    private readonly tbNewsService;
    constructor(tbNewsService: TbNewsService);
    findAdminNews(): Promise<TbNew[]>;
    findNewNews(): Promise<TbNew[]>;
    findNewsImportant(): Promise<TbNew[]>;
    findNewsActivity(): Promise<TbNew[]>;
    findNewsScholarShip(): Promise<TbNew[]>;
    findNewNewsLogin(req: any): Promise<TbNew[]>;
    findNewsImportantRoom(req: any): Promise<TbNew[]>;
    findNewsInClassAll(req: any): Promise<TbNew[]>;
    findNewsActivityAll(req: any): Promise<TbNew[]>;
    findNewsScholarShipAll(req: any): Promise<TbNew[]>;
    findMyNews(req: any): Promise<TbNew[]>;
    searchNews(query: string): Promise<TbNew[]>;
    findNewsByUser(userType: string, userId: number, viewerRoom: string, viewerYear: string): Promise<TbNew[]>;
    findNewsDetail(newId: number): Promise<TbNew>;
    getFile(filename: string, res: Response): Promise<void>;
    create(createTbNewDto: CreateTbNewDto, req: any): Promise<TbNew>;
    adminUpdateNews(newId: number, updateDto: UpdateTbNewDto, req: any): Promise<TbNew>;
    updateNews(newId: number, updateDto: UpdateTbNewDto, req: any): Promise<TbNew>;
    adminDeleteNews(newId: number, req: any): Promise<{
        message: string;
    }>;
    deleteNews(newId: number, req: any): Promise<{
        message: string;
    }>;
    uploadCoverImage(newId: number, file: Express.Multer.File): Promise<{
        message: string;
    }>;
}
