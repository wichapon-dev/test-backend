import { TbFilesService } from './tb_files.service';
export declare class TbFilesController {
    private readonly tbFilesService;
    constructor(tbFilesService: TbFilesService);
    uploadFiles(newId: number, files: Express.Multer.File[]): Promise<{
        message: string;
    }>;
    deleteFile(fileId: number): Promise<{
        message: string;
    }>;
}
