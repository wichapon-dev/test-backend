import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TbAdmin, TbLecturer, TbStudent])],
  controllers: [UserManagementController],
  providers: [UserManagementService],
})
export class UserManagementModule {}
