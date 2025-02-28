import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(TbAdmin)
    private adminRepository: Repository<TbAdmin>,
    @InjectRepository(TbLecturer)
    private lecturerRepository: Repository<TbLecturer>,
    @InjectRepository(TbStudent)
    private studentRepository: Repository<TbStudent>,
  ) {}

  async getAllUsers() {
    const admins = await this.adminRepository.find();
    const lecturers = await this.lecturerRepository.find();
    const students = await this.studentRepository.find({ relations: ['room', 'year'] });
  
    const adminList = admins.map(admin => ({
      id: admin.admin_id,
      userType: 'ผู้ดูแลระบบ', // เปลี่ยนจาก "admin" เป็น "ผู้ดูแลระบบ"
      firstName: admin.admin_fname,
      lastName: admin.admin_lname,
      email: admin.admin_email,
      profileImage: admin.profile_image,
      room: null,
      academicYear: null,
    }));
  
    const lecturerList = lecturers.map(lecturer => ({
      id: lecturer.lecturer_id,
      userType: 'อาจารย์', // เปลี่ยนจาก "lecturer" เป็น "อาจารย์"
      firstName: lecturer.lecturer_fname,
      lastName: lecturer.lecturer_lname,
      email: lecturer.lecturer_email,
      profileImage: lecturer.profile_image,
      room: null,
      academicYear: null,
    }));
  
    const studentList = students.map(student => ({
      id: student.student_id,
      userType: 'นักศึกษา', // เปลี่ยนจาก "student" เป็น "นักศึกษา"
      firstName: student.student_fname,
      lastName: student.student_lname,
      email: student.student_email,
      profileImage: student.profile_image,
      room: student.room ? student.room.room_name : null,
      roomId: student.room ? student.room.room_id : null,
      academicYear: student.year ? student.year.year_name : null,
      academicYearId: student.year ? student.year.year_id : null,
    }));
    
    return [...adminList, ...lecturerList, ...studentList];
  }

  async createUser(data: any) {
    const { userType, firstName, lastName, email, profileImage, room, academicYear, password, role } = data;
    const plainPassword = password ? password : '123456';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    if (userType === 'ผู้ดูแลระบบ') {
      const newAdmin = this.adminRepository.create({
        admin_fname: firstName,
        admin_lname: lastName,
        admin_email: email,
        admin_password: hashedPassword,
        profile_image: profileImage,
        role: role ? { role_id: +role } as any : undefined,
      });
      return await this.adminRepository.save(newAdmin);
    } else if (userType === 'อาจารย์') {
      const newLecturer = this.lecturerRepository.create({
        lecturer_fname: firstName,
        lecturer_lname: lastName,
        lecturer_email: email,
        lecturer_password: hashedPassword,
        profile_image: profileImage,
        role: role ? { role_id: +role } as any : undefined,
      });
      return await this.lecturerRepository.save(newLecturer);
    } else if (userType === 'นักศึกษา') {
      const newStudent = this.studentRepository.create({
        student_fname: firstName,
        student_lname: lastName,
        student_email: email,
        student_password: hashedPassword,
        profile_image: profileImage,
        role: role ? { role_id: +role } as any : undefined,
      });
      if (room) {
        newStudent.room = { room_id: +room } as any;
      }
      if (academicYear) {
        newStudent.year = { year_id: +academicYear } as any;
      }
      return await this.studentRepository.save(newStudent);
    } else {
      throw new Error('Invalid userType');
    }
  }

  private deleteOldFile(filePath: string) {
    // เอาเครื่องหมาย / หน้าออก (ถ้ามี)
    const relativePath = filePath.startsWith('/') ? filePath.substr(1) : filePath;
    const fullPath = join(process.cwd(), relativePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  async updateUser(id: number, userType: string, data: any) {
    if (userType === 'ผู้ดูแลระบบ') {
      // ถ้ามีการอัปโหลดไฟล์ใหม่ให้ลบไฟล์เก่าทิ้ง
      if (data.profileImage) {
        const admin = await this.adminRepository.findOneBy({ admin_id: id });
        if (admin && admin.profile_image && admin.profile_image !== data.profileImage) {
          this.deleteOldFile(admin.profile_image);
        }
      }
      const updateData: any = {
        admin_fname: data.firstName,
        admin_lname: data.lastName,
        admin_email: data.email,
        profile_image: data.profileImage,
      };
      if (data.password) {
        updateData.admin_password = await bcrypt.hash(data.password, 10);
      }
      if (data.role) {
        updateData.role = { role_id: +data.role } as any;
      }
      await this.adminRepository.update(id, updateData);
      return await this.adminRepository.findOneBy({ admin_id: id });
    } else if (userType === 'อาจารย์') {
      if (data.profileImage) {
        const lecturer = await this.lecturerRepository.findOneBy({ lecturer_id: id });
        if (lecturer && lecturer.profile_image && lecturer.profile_image !== data.profileImage) {
          this.deleteOldFile(lecturer.profile_image);
        }
      }
      const updateData: any = {
        lecturer_fname: data.firstName,
        lecturer_lname: data.lastName,
        lecturer_email: data.email,
        profile_image: data.profileImage,
      };
      if (data.password) {
        updateData.lecturer_password = await bcrypt.hash(data.password, 10);
      }
      if (data.role) {
        updateData.role = { role_id: +data.role } as any;
      }
      await this.lecturerRepository.update(id, updateData);
      return await this.lecturerRepository.findOneBy({ lecturer_id: id });
    } else if (userType === 'นักศึกษา') {
      if (data.profileImage) {
        const student = await this.studentRepository.findOne({
          where: { student_id: id },
          relations: ['room', 'year'],
        });
        if (student && student.profile_image && student.profile_image !== data.profileImage) {
          this.deleteOldFile(student.profile_image);
        }
      }
      const updateData: any = {
        student_fname: data.firstName,
        student_lname: data.lastName,
        student_email: data.email,
        profile_image: data.profileImage,
      };
      if (data.password) {
        updateData.student_password = await bcrypt.hash(data.password, 10);
      }
      if (data.role) {
        updateData.role = { role_id: +data.role } as any;
      }
      if (data.room) {
        updateData.room = { room_id: +data.room } as any;
      }
      if (data.academicYear) {
        updateData.year = { year_id: +data.academicYear } as any;
      }
      await this.studentRepository.update(id, updateData);
      return await this.studentRepository.findOne({
        where: { student_id: id },
        relations: ['room', 'year'],
      });
    } else {
      throw new Error('Invalid userType');
    }
  }

  async deleteUser(id: number, userType: string) {
    if (userType === 'admin') {
      return await this.adminRepository.delete(id);
    } else if (userType === 'อาจารย์') {
      return await this.lecturerRepository.delete(id);
    } else if (userType === 'นักศึกษา') {
      return await this.studentRepository.delete(id);
    } else {
      throw new Error('Invalid userType');
    }
  }

  async getUserProfile(id: number, userType: string) {
    if (userType === 'ผู้ดูแลระบบ') {
      const admin = await this.adminRepository.findOneBy({ admin_id: id });
      if (!admin) throw new Error('User not found');
      return {
        id: admin.admin_id,
        userType: 'ผู้ดูแลระบบ',
        firstName: admin.admin_fname,
        lastName: admin.admin_lname,
        email: admin.admin_email,
        profileImage: admin.profile_image,
      };
    } else if (userType === 'อาจารย์') {
      const lecturer = await this.lecturerRepository.findOneBy({ lecturer_id: id });
      if (!lecturer) throw new Error('User not found');
      return {
        id: lecturer.lecturer_id,
        userType: 'อาจารย์',
        firstName: lecturer.lecturer_fname,
        lastName: lecturer.lecturer_lname,
        email: lecturer.lecturer_email,
        profileImage: lecturer.profile_image,
      };
    } else if (userType === 'นักศึกษา') {
      const student = await this.studentRepository.findOne({
        where: { student_id: id },
        relations: ['room', 'year'],
      });
      if (!student) throw new Error('User not found');
      return {
        id: student.student_id,
        userType: 'นักศึกษา',
        firstName: student.student_fname,
        lastName: student.student_lname,
        email: student.student_email,
        profileImage: student.profile_image,
        room: student.room ? student.room.room_name : null,
        academicYear: student.year ? student.year.year_name : null,
      };
    } else {
      throw new Error('Invalid userType');
    }
  }
  
}
