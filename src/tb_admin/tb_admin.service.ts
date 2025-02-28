import { Injectable } from '@nestjs/common';
import { TbAdmin } from './entities/tb_admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { signupDto } from './dto/admin-signup.dto';

@Injectable()
export class TbAdminService {
  constructor(
    @InjectRepository(TbAdmin)
    private adminRepository: Repository<TbAdmin>,
  ) {}

  async findOne(email: string): Promise<TbAdmin | undefined> {
    return this.adminRepository.findOne({
      where: { admin_email: email },
      relations: ['role'],
    });
  }

  async create(signupDto: signupDto): Promise<TbAdmin> {
    const newAdmin = this.adminRepository.create(signupDto);
    newAdmin.admin_password = await bcrypt.hash(signupDto.admin_password, 10);
    return this.adminRepository.save(newAdmin);
  }

  // เปลี่ยนชื่อฟังก์ชันเป็น updateLastActive
  async updateLastActive(adminId: number, lastActive: Date) {
    await this.adminRepository.update(adminId, { last_active: lastActive });
  }
}
