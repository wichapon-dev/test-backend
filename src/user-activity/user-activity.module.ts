import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { UserActivityService } from './user-activity.service';
import { UserActivityController } from './user-activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TbAdmin, TbLecturer, TbStudent])],
  providers: [UserActivityService],
  controllers: [UserActivityController],
})
export class UserActivityModule {}
