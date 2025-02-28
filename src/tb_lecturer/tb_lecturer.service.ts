import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TbLecturer } from './entities/tb_lecturer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { signupDto } from './dto/lecturer-signup.dto';

@Injectable()
export class TbLecturerService {
  constructor(
    @InjectRepository(TbLecturer)
    private lecturerRepository: Repository<TbLecturer>,
  ) {}

  async findOne(email: string): Promise<TbLecturer | undefined> {
    return this.lecturerRepository.findOne({
      where: { lecturer_email: email },
      relations: ['role'],
    });
  }

  async create(signupDto: signupDto): Promise<TbLecturer> {
    const newLecturer = this.lecturerRepository.create(signupDto);
    newLecturer.lecturer_password = await bcrypt.hash(signupDto.lecturer_password, 10);
    return this.lecturerRepository.save(newLecturer);
  }

  // เปลี่ยนชื่อฟังก์ชันเป็น updateLastActive
  async updateLastActive(lecturerId: number, lastActive: Date) {
    await this.lecturerRepository.update(lecturerId, { last_active: lastActive });
  }
}
