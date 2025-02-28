import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TbComments } from './entities/tb_comment.entity';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { CreateTbCommentDto } from './dto/create-tb_comment.dto';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { TbLecturer } from 'src/tb_lecturer/entities/tb_lecturer.entity';
import { TbAdmin } from 'src/tb_admin/entities/tb_admin.entity';

@Injectable()
export class TbCommentsService {
  constructor(
    @InjectRepository(TbComments)
    private readonly commentsRepository: Repository<TbComments>,
    @InjectRepository(TbStudent)
    private readonly studentRepository: Repository<TbStudent>,
    @InjectRepository(TbLecturer)
    private readonly lecturerRepository: Repository<TbLecturer>,
    @InjectRepository(TbAdmin)
    private readonly adminRepository: Repository<TbAdmin>,
    @InjectRepository(TbNew)
    private readonly newsRepository: Repository<TbNew>,
  ) {}

  // ดึงคอมเมนต์ของข่าว พร้อมรวมความสัมพันธ์ของผู้โพสต์ให้ครบ (นักศึกษา, อาจารย์, ผู้ดูแลระบบ)
  async findNews(newsId: number) {
    return this.commentsRepository.find({
      where: { news: { new_id: newsId } },
      relations: ['students', 'lecturers', 'admins'],
    });
  }

  // สร้างคอมเมนต์โดยใช้ข้อมูลจาก JWT ในการระบุว่าโพสต์โดยผู้ใช้ประเภทใด
  async create(createCommentDto: CreateTbCommentDto, user: any) {
    const { comments_detail, newsId } = createCommentDto;
    const news = await this.newsRepository.findOne({ where: { new_id: newsId } });
    if (!news) {
      throw new NotFoundException('ข่าวไม่พบ');
    }

    const comment = new TbComments();
    comment.comments_detail = comments_detail;
    comment.news = news;

    // กำหนดความสัมพันธ์ตามประเภทผู้ใช้งานที่โพสต์
    if (user.userType === 'นักศึกษา') {
      const student = await this.studentRepository.findOne({ where: { student_id: user.id } });
      if (!student) {
        throw new NotFoundException('ไม่พบข้อมูลนักศึกษา');
      }
      comment.students = student;
    } else if (user.userType === 'อาจารย์') {
      const lecturer = await this.lecturerRepository.findOne({ where: { lecturer_id: user.id } });
      if (!lecturer) {
        throw new NotFoundException('ไม่พบข้อมูลอาจารย์');
      }
      comment.lecturers = lecturer;
    } else if (user.userType === 'ผู้ดูแลระบบ') {
      const admin = await this.adminRepository.findOne({ where: { admin_id: user.id } });
      if (!admin) {
        throw new NotFoundException('ไม่พบข้อมูลผู้ดูแลระบบ');
      }
      comment.admins = admin;
    } else {
      throw new BadRequestException('ประเภทผู้ใช้งานไม่ถูกต้อง');
    }

    return this.commentsRepository.save(comment);
  }
}
