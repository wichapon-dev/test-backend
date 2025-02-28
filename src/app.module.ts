import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TbRoleModule } from './tb_role/tb_role.module';
import { TbNewsModule } from './tb_news/tb_news.module';
import { TbCommentsModule } from './tb_comments/tb_comments.module';
import { TbFilesModule } from './tb_files/tb_files.module';
import { TbFiles } from './tb_files/entities/tb_file.entity';
import { TbComments } from './tb_comments/entities/tb_comment.entity';
import { TbRole } from './tb_role/entities/tb_role.entity';
import { TbNew } from './tb_news/entities/tb_new.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TbRoomModule } from './tb_room/tb_room.module';
import { TbYearModule } from './tb_year/tb_year.module';
import { TbYear } from './tb_year/entities/tb_year.entity';
import { TbRoom } from './tb_room/entities/tb_room.entity';
import { TbAdminModule } from './tb_admin/tb_admin.module';
import { TbLecturerModule } from './tb_lecturer/tb_lecturer.module';
import { TbAdmin } from './tb_admin/entities/tb_admin.entity';
import { TbLecturer } from './tb_lecturer/entities/tb_lecturer.entity';
import { TbStudentModule } from './tb_student/tb_student.module';
import { TbStudent } from './tb_student/entities/tb_student.entity';
import { UserActivityModule } from './user-activity/user-activity.module';
import { UserManagementModule } from './user-management/user-management.module';
import * as fs from 'fs';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATANAME,
      entities: [TbNew,TbRole,TbYear,TbRoom,TbComments,TbFiles,TbAdmin,TbLecturer,TbStudent],
      synchronize: true,
     ssl: {
        ca: fs.readFileSync('./certs/ca.pem').toString(),
      },
    }),
    AuthModule,
    TbRoleModule, 
    TbNewsModule, 
    TbCommentsModule, 
    TbFilesModule,
    TbRoomModule, 
    TbYearModule, 
    TbAdminModule, 
    TbLecturerModule, TbStudentModule, UserActivityModule, UserManagementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
