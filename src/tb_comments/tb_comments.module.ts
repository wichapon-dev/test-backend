import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbCommentsService } from './tb_comments.service';
import { TbCommentsController } from './tb_comments.controller';
import { TbComments } from './entities/tb_comment.entity';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { TbNewsModule } from 'src/tb_news/tb_news.module';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { TbStudentModule } from 'src/tb_student/tb_student.module';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbLecturerModule } from 'src/tb_lecturer/tb_lecturer.module';
import { TbAdminModule } from 'src/tb_admin/tb_admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TbComments, TbNew, TbStudent,TbAdmin,TbLecturer]), // เพิ่ม TbNew และ TbPersonnel
    TbStudentModule,
    TbLecturerModule,
    TbAdminModule, // นำเข้า TbPersonnelModule
    TbNewsModule,      // นำเข้า TbNewsModule
  ],
  providers: [TbCommentsService],
  controllers: [TbCommentsController],
  exports: [TbCommentsService],
})
export class TbCommentsModule {}
