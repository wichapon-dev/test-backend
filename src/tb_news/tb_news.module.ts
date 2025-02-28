import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbNewsService } from './tb_news.service';
import { TbNewsController } from './tb_news.controller';
import { TbNew } from './entities/tb_new.entity';
import { TbFiles } from 'src/tb_files/entities/tb_file.entity';
import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TbNew,TbFiles,TbStudent,TbComments,TbLecturer,TbAdmin])],
  controllers: [TbNewsController],
  providers: [TbNewsService],
  exports: [TypeOrmModule, TbNewsService], // Export TypeOrmModule และ Service
})
export class TbNewsModule {}

