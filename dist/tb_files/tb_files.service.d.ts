import { Repository } from 'typeorm';
import { TbFiles } from './entities/tb_file.entity';
export declare class TbFilesService {
    private readonly tbUserfilesRepository;
    constructor(tbUserfilesRepository: Repository<TbFiles>);
    uploadFile(newId: number, filePath: string): Promise<TbFiles>;
    findFile(fileId: number): Promise<TbFiles>;
    deleteFile(fileId: number): Promise<void>;
}
