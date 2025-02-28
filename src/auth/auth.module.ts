// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { TbStudentModule } from 'src/tb_student/tb_student.module';
import { TbAdminModule } from 'src/tb_admin/tb_admin.module';
import { TbLecturerModule } from 'src/tb_lecturer/tb_lecturer.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'test123456',
      signOptions: { expiresIn: '24h' },
    }),
    TbStudentModule,
    TbAdminModule,
    TbLecturerModule,
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
