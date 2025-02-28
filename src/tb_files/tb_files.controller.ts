import { Controller, Post, UploadedFiles, Param, UseInterceptors, Get, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TbFilesService } from './tb_files.service';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { unlink } from 'fs/promises';


@Controller('tb-files')
export class TbFilesController {
  constructor(private readonly tbFilesService: TbFilesService) {}

  @Post(':newId/upload')
  @UseInterceptors(FilesInterceptor('files', 10, { //กำหนดจำนวนไฟล์สูงสุด
    storage: diskStorage({
      destination: './uploads/files',
      filename: (req, file, callback) => {
        const fileExtName = extname(file.originalname);
        const fileName = `${Date.now()}${fileExtName}`;
        callback(null, fileName);
      },
    }),
  }))
  async uploadFiles(
    @Param('newId') newId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const fileUploadPromises = files.map(file => {
      const filePath = `/uploads/files/${file.filename}`;
      return this.tbFilesService.uploadFile(newId, filePath);
    });
    await Promise.all(fileUploadPromises);
    return { message: 'Files uploaded successfully' };
  }

  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: number) {
    // ค้นหาไฟล์จากฐานข้อมูลก่อน
    const file = await this.tbFilesService.findFile(fileId);
    if (!file) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    // แปลง path ให้เป็น absolute path โดยเอาเครื่องหมาย / ที่จุดเริ่มต้นออก (ถ้ามี)
    const absolutePath = join(
      process.cwd(),
      file.file_path.startsWith('/') ? file.file_path.substring(1) : file.file_path,
    );
    try {
      await unlink(absolutePath);
    } catch (error) {
      // หากลบไฟล์จากดิสก์ไม่สำเร็จ (เช่น ไฟล์ไม่มีอยู่) สามารถ log error ได้
      console.error('Error deleting file from disk:', error);
    }
    // ลบข้อมูลไฟล์ออกจากฐานข้อมูล
    await this.tbFilesService.deleteFile(fileId);
    return { message: 'File deleted successfully' };
  }
 
}
