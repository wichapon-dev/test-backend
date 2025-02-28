import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TbStudentService } from 'src/tb_student/tb_student.service';
import { TbAdminService } from 'src/tb_admin/tb_admin.service';
import { TbLecturerService } from 'src/tb_lecturer/tb_lecturer.service';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private tbStudentService: TbStudentService,
    private tbAdminService: TbAdminService,
    private tbLecturerService: TbLecturerService,
    private jwtService: JwtService,
  ) {}

  // ตรวจสอบผู้ใช้จาก admin, lecturer และ student
  async validateUser(email: string, password: string): Promise<any> {
    // ตรวจสอบ Admin
    const admin = await this.tbAdminService.findOne(email);
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.admin_password);
      if (isMatch) {
        // อัปเดต last_active
        const now = new Date();
        admin.last_active = now;
        await this.tbAdminService.updateLastActive(admin.admin_id, now);
        return {
          id: admin.admin_id,
          email: admin.admin_email,
          firstName: admin.admin_fname,
          lastName: admin.admin_lname,
          role: admin.role?.role_access,
          userType: 'ผู้ดูแลระบบ',
          image: admin.profile_image, // รวมรูปโปรไฟล์
        };
      }
    }

    // ตรวจสอบ Lecturer
    const lecturer = await this.tbLecturerService.findOne(email);
    if (lecturer) {
      const isMatch = await bcrypt.compare(password, lecturer.lecturer_password);
      if (isMatch) {
        const now = new Date();
        lecturer.last_active = now;
        await this.tbLecturerService.updateLastActive(lecturer.lecturer_id, now);
        return {
          id: lecturer.lecturer_id,
          email: lecturer.lecturer_email,
          firstName: lecturer.lecturer_fname,
          lastName: lecturer.lecturer_lname,
          role: lecturer.role?.role_access,
          userType: 'อาจารย์',
          image: lecturer.profile_image, // รวมรูปโปรไฟล์
        };
      }
    }

    // ตรวจสอบ Student
    const student = await this.tbStudentService.findOne(email);
    if (student) {
      const isMatch = await bcrypt.compare(password, student.student_password);
      if (isMatch) {
        const now = new Date();
        student.last_active = now;
        await this.tbStudentService.updateLastActive(student.student_id, now);
        return {
          id: student.student_id,
          email: student.student_email,
          firstName: student.student_fname,
          lastName: student.student_lname,
          role: student.role?.role_access,
          userType: 'นักศึกษา',
          room: student.room?.room_name,
          year: student.year?.year_name,
          image: student.profile_image, // รวมรูปโปรไฟล์
        };
      }
    }

    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
