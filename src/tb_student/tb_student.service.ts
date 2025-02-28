import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TbStudent } from './entities/tb_student.entity';
import { signupDto } from './dto/student-signup.dto';

@Injectable()
export class TbStudentService {
  constructor(
    @InjectRepository(TbStudent)
    private studentRepository: Repository<TbStudent>,
  ) {} 

  async findOne(student_email: string): Promise<TbStudent | undefined> {
    return this.studentRepository.findOne({
      where: { student_email },
      relations: ['role', 'room', 'year']
    });
  }
  
  async create(signupDto: signupDto): Promise<TbStudent> {
    const newStudent = this.studentRepository.create(signupDto);
    newStudent.student_password = await bcrypt.hash(signupDto.student_password, 10);
    return this.studentRepository.save(newStudent);
  }

  // เปลี่ยนชื่อฟังก์ชันเป็น updateLastActive
  async updateLastActive(studentId: number, lastActive: Date) {
    await this.studentRepository.update(studentId, { last_active: lastActive });
  }

  
}
