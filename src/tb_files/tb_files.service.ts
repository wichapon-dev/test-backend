import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TbFiles } from './entities/tb_file.entity';


@Injectable()
export class TbFilesService {
  constructor(
    @InjectRepository(TbFiles)
    private readonly tbUserfilesRepository: Repository<TbFiles>,
  ) {}

  async uploadFile(newId: number, filePath: string): Promise<TbFiles> {
    const newUserFile = this.tbUserfilesRepository.create({
      news: { new_id: newId },
      file_path: filePath,
    });
    return this.tbUserfilesRepository.save(newUserFile);
  }
  async findFile(fileId: number): Promise<TbFiles> {
    return this.tbUserfilesRepository.findOne({ where: { file_id: fileId } });
  }

  async deleteFile(fileId: number): Promise<void> {
    await this.tbUserfilesRepository.delete(fileId);
  }
  
}