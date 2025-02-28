// user-activity.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';

@Injectable()
export class UserActivityService {
  constructor(
    @InjectRepository(TbAdmin)
    private adminRepo: Repository<TbAdmin>,
    @InjectRepository(TbLecturer)
    private lecturerRepo: Repository<TbLecturer>,
    @InjectRepository(TbStudent)
    private studentRepo: Repository<TbStudent>,
  ) {}

  async getLatestUsers() {
    // ดึงข้อมูล Admin
    const admins = await this.adminRepo.find({
      select: ['admin_id', 'admin_email', 'admin_fname', 'admin_lname', 'last_active', 'profile_image'],
      order: { last_active: 'DESC' },
    });

    // ดึงข้อมูล Lecturer
    const lecturers = await this.lecturerRepo.find({
      select: ['lecturer_id', 'lecturer_email', 'lecturer_fname', 'lecturer_lname', 'last_active', 'profile_image'],
      order: { last_active: 'DESC' },
    });

    // ดึงข้อมูล Student (รวม relations room และ year)
    const students = await this.studentRepo.find({
      select: ['student_id', 'student_email', 'student_fname', 'student_lname', 'last_active', 'profile_image'],
      relations: ['room', 'year'],
      order: { last_active: 'DESC' },
    });

    // รวมข้อมูลและ map ค่าให้เป็น unified object
    const unified = [
      ...admins.map(a => ({
        id: a.admin_id,
        email: a.admin_email,
        firstName: a.admin_fname,
        lastName: a.admin_lname,
        userType: 'ผู้ดูแลระบบ',
        lastActive: a.last_active,
        profileImage: a.profile_image || '/default-avatar.png',
        room: 'N/A',
        academicYear: 'N/A',
      })),
      ...lecturers.map(l => ({
        id: l.lecturer_id,
        email: l.lecturer_email,
        firstName: l.lecturer_fname,
        lastName: l.lecturer_lname,
        userType: 'อาจารย์',
        lastActive: l.last_active,
        profileImage: l.profile_image || '/default-avatar.png',
        room: 'N/A',
        academicYear: 'N/A',
      })),
      ...students.map(s => ({
        id: s.student_id,
        email: s.student_email,
        firstName: s.student_fname,
        lastName: s.student_lname,
        userType: 'นักศึกษา',
        lastActive: s.last_active,
        profileImage: s.profile_image || '/default-avatar.png',
        room: s.room?.room_name || 'N/A',
        academicYear: s.year?.year_name || 'N/A',
      })),
    ];

    // เรียงลำดับจากล่าสุด
    unified.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());

    // กำหนดเงื่อนไข online: ถ้า lastActive อยู่ภายใน 5 นาทีล่าสุด ถือว่าออนไลน์
    const now = new Date();
    const threshold = 5 * 60 * 1000; // 5 นาทีในมิลลิวินาที
    const result = unified.map(user => ({
      ...user,
      online: now.getTime() - new Date(user.lastActive).getTime() < threshold,
    }));

    return result;
  }

  // เมธอดสำหรับ heartbeat (อัปเดต last_active)
  async updateHeartbeat(user: any): Promise<void> {
    const now = new Date();
    if (user.userType === 'ผู้ดูแลระบบ') {
      await this.adminRepo.update(user.id, { last_active: now });
    } else if (user.userType === 'อาจารย์') {
      await this.lecturerRepo.update(user.id, { last_active: now });
    } else if (user.userType === 'นักศึกษา') {
      await this.studentRepo.update(user.id, { last_active: now });
    }
  }

  async getRoleUsageStatistics() {
    const adminCount = await this.adminRepo.count();
    const lecturerCount = await this.lecturerRepo.count();
    const studentCount = await this.studentRepo.count();

    return {
      admin: adminCount,
      lecturer: lecturerCount,
      student: studentCount,
    };
  }
}
