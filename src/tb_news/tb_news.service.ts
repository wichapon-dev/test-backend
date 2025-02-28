import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TbNew } from './entities/tb_new.entity';
import { CreateTbNewDto } from './dto/create-tb_new.dto';
import { TbFiles } from 'src/tb_files/entities/tb_file.entity';
import { TbStudent } from 'src/tb_student/entities/tb_student.entity';
import { UpdateTbNewDto } from './dto/update-tb_new.dto';
import { join } from 'path';
import { unlink } from 'fs/promises';
import { TbComments } from 'src/tb_comments/entities/tb_comment.entity';

@Injectable()
export class TbNewsService {
  constructor(
    @InjectRepository(TbNew)
    private readonly newsRepository: Repository<TbNew>,
    @InjectRepository(TbStudent)
    private readonly studentRepository: Repository<TbStudent>,
    @InjectRepository(TbFiles)
    private readonly filesRepository: Repository<TbFiles>,
    @InjectRepository(TbComments)
    private readonly commentsRepository: Repository<TbComments>,
  ) {}

    async find(filter: any) {
      return this.newsRepository.find({ where: filter });
    }

    async findNewNews() {
      return await this.newsRepository.find({
        where:[ 
          { room: 'all', year: 'all' },
         
        ], // แสดงข่าวที่เป็น 'all' เท่านั้น
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findImportant() {
      return await this.newsRepository.find({
        where: { isImportant: true , room: 'all', year: 'all'},
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findNewsScholarShip() {
      return await this.newsRepository.find({
        where: [
          {category: 'ทุนการศึกษา', room: 'all' , year: 'all'},
          {isImportant: true ,category: 'scholarship', room: 'all' , year: 'all'}
        ],
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findNewsActivity() {
      return await this.newsRepository.find({
        where: [
          {category: 'กิจกรรม', room: 'all' , year: 'all'},
          {isImportant: true ,category: 'activity', room: 'all' , year: 'all'}
        ],
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findNewNewsAll(studentRoom: string , studentYear: string) {
      return await this.newsRepository.find({
        where: [
          {room: studentRoom ,year: studentYear},
          {room: 'all' ,year: 'all'},
          {room: studentRoom ,year: 'all'},
          {room: 'all' ,year: studentYear},
        ],
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id','content', 'title', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findNewsImportantRoomAll(studentRoom: string ,studentYear: string) {
      return await this.newsRepository.find({
        where: [
          {isImportant: true, room: studentRoom, year: studentYear},
          {isImportant: true, room: 'all', year: 'all'}, // ข่าวที่ทุกคนสามารถเห็นได้
          {isImportant: true, room: studentRoom, year: 'all'},
          {isImportant: true, room: 'all', year: studentYear}, // ข่าวที่ทุกคนสามารถเห็นได้
        ],
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }
    
    async findNewsInClassAll(studentRoom: string ,studentYear: string) {
      return await this.newsRepository.find({
        where: [
          {room: studentRoom ,year: studentYear},
          {room: studentRoom ,year: 'all'},
          {isImportant: true, room: studentRoom, year: studentYear},
          {isImportant: true, room: studentRoom, year: 'all'},
        ],
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room', 'year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findNewsActivityAll(studentRoom: string ,studentYear: string) {
      return await this.newsRepository.find({
        where: [
          {category: 'กิจกรรม', room: studentRoom , year: studentYear},
          {category: 'กิจกรรม', room: 'all', year: 'all'},
          {category: 'กิจกรรม', isImportant: true, room: studentRoom, year: studentYear},
          {category: 'กิจกรรม', isImportant: true, room: 'all', year: 'all'},
          { category: 'กิจกรรม', room: studentRoom, year: 'all' },
          { category: 'กิจกรรม', room: 'all', year: studentYear },
        ],
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findNewsScholarShipAll(studentRoom: string , studentYear: string) {
      return await this.newsRepository.find({
        where: [
          {category: 'ทุนการศึกษา', room: studentRoom , year: studentYear},
          {category: 'ทุนการศึกษา', room: 'all', year: 'all'},
          {category: 'ทุนการศึกษา', isImportant: true, room: studentRoom, year: studentYear},
          {category: 'ทุนการศึกษา', isImportant: true, room: 'all', year: 'all'},
          { category: 'ทุนการศึกษา', room: studentRoom, year: 'all' },
          { category: 'ทุนการศึกษา', room: 'all', year: studentYear },
        ],
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async findGlobalAndMyNews(user: any): Promise<TbNew[]> {
      if (user.userType === 'ผู้ดูแลระบบ') {
        return await this.newsRepository.find({
          where: [
            { room: 'all', year: 'all' }, // ข่าวสำหรับทุกคน
            { admins: { admin_id: user.id } } // ข่าวที่ผู้ดูแลระบบตัวเองเพิ่ม
          ],
          relations: ['admins', 'lecturers', 'students'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else if (user.userType === 'อาจารย์') {
        return await this.newsRepository.find({
          where: [
            { room: 'all', year: 'all' }, // ข่าวสำหรับทุกคน
            { lecturers: { lecturer_id: user.id } } // ข่าวที่อาจารย์ตัวเองเพิ่ม
          ],
          relations: ['admins', 'lecturers', 'students'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else {
        throw new ForbiddenException('Endpoint นี้ใช้ได้เฉพาะสำหรับผู้ดูแลระบบและอาจารย์');
      }
    }

    async findImportantGlobalAndMyNews(user: any) {
      if (user.userType === 'ผู้ดูแลระบบ') {
        return await this.newsRepository.find({
          where: [
            { isImportant: true, room: 'all', year: 'all' }, // ข่าวสำคัญสำหรับทุกคน
            { isImportant: true, admins: { admin_id: user.id } } // ข่าวสำคัญที่ผู้ดูแลระบบตัวเองเพิ่ม
          ],
          relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else if (user.userType === 'อาจารย์') {
        return await this.newsRepository.find({
          where: [
            { isImportant: true, room: 'all', year: 'all' }, // ข่าวสำคัญสำหรับทุกคน
            { isImportant: true, lecturers: { lecturer_id: user.id } } // ข่าวสำคัญที่อาจารย์ตัวเองเพิ่ม
          ],
          relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else {
        throw new ForbiddenException('ผู้ใช้ไม่สามารถเข้าถึง endpoint นี้');
      }
    }

    async findActivityGlobalAndMyNews(user: any) {
      if (user.userType === 'ผู้ดูแลระบบ') {
        return await this.newsRepository.find({
          where: [
            { category: 'กิจกรรม', room: 'all', year: 'all' }, // ข่าวกิจกรรมสำหรับทุกคน
            { category: 'กิจกรรม', admins: { admin_id: user.id } } // ข่าวกิจกรรมที่ผู้ดูแลระบบตัวเองเพิ่ม
          ],
          relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else if (user.userType === 'อาจารย์') {
        return await this.newsRepository.find({
          where: [
            { category: 'กิจกรรม', room: 'all', year: 'all' },
            { category: 'กิจกรรม', lecturers: { lecturer_id: user.id } }
          ],
          relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else {
        throw new ForbiddenException('นักศึกษาไม่สามารถเข้าถึงข่าวกิจกรรมแบบนี้ได้');
      }
    }

    async findScholarshipGlobalAndMyNews(user: any) {
      if (user.userType === 'ผู้ดูแลระบบ') {
        return await this.newsRepository.find({
          where: [
            { category: 'ทุนการศึกษา', room: 'all', year: 'all' }, // ข่าวทุนการศึกษาสำหรับทุกคน
            { category: 'ทุนการศึกษา', admins: { admin_id: user.id } } // ข่าวทุนที่ผู้ดูแลระบบตัวเองเพิ่ม
          ],
          relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else if (user.userType === 'อาจารย์') {
        return await this.newsRepository.find({
          where: [
            { category: 'ทุนการศึกษา', room: 'all', year: 'all' },
            { category: 'ทุนการศึกษา', lecturers: { lecturer_id: user.id } }
          ],
          relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
          order: { date_last_post: 'DESC' },
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
        });
      } else {
        throw new ForbiddenException('นักศึกษาไม่สามารถเข้าถึง endpoint นี้');
      }
    }

    async findMyNews(user: any) {
      if (user.userType === 'ผู้ดูแลระบบ') {
        return await this.newsRepository.find({
          where: { admins: { admin_id: user.id } },
          relations: ['admins', 'files'],
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
          order: { date_last_post: 'DESC' },
        });
      } else if (user.userType === 'อาจารย์') {
        return await this.newsRepository.find({
          where: { lecturers: { lecturer_id: user.id } },
          relations: ['lecturers', 'files'],
          select: [
            'new_id',
            'title',
            'content',
            'category',
            'room',
            'year',
            'date_last_post',
            'coverImage',
            'isImportant'
          ],
          order: { date_last_post: 'DESC' },
        });
      } else {
        // ถ้าผู้ใช้เป็นนักศึกษา จะไม่มีข่าวที่ตนเองเพิ่ม
        throw new ForbiddenException('นักศึกษาไม่สามารถเข้าถึงข่าวที่สร้างเองได้');
      }
    }

    async searchNews(keyword: string) {
      return await this.newsRepository.find({
        where: [
          { title: Like(`%${keyword}%`) },
          { category: Like(`%${keyword}%`) }
        ],
        select: ['new_id', 'title', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' },
      });
    }

    async findNewsByUser(
      userType: string,
      userId: number,
      viewerRoom?: string,
      viewerYear?: string,
    ): Promise<TbNew[]> {
      if (userType === 'ผู้ดูแลระบบ') {
        if (viewerRoom && viewerYear) {
          return await this.newsRepository.find({
            where: [
              { admins: { admin_id: userId }, room: viewerRoom, year: viewerYear },
              { admins: { admin_id: userId }, room: 'all', year: 'all' },
              { admins: { admin_id: userId }, room: viewerRoom, year: 'all' },
              { admins: { admin_id: userId }, room: 'all', year: viewerYear },
              { admins: { admin_id: userId }, isImportant: true, room: 'all', year: 'all' },
              { admins: { admin_id: userId }, isImportant: true, room: viewerRoom, year: 'all' },
              { admins: { admin_id: userId }, isImportant: true, room: 'all', year: viewerYear },
              
            ],
            relations: ['admins'],
            order: { date_last_post: 'DESC' },
            select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post','isImportant'],
          });
        } else {
          // หาก viewer ไม่ได้ระบุ room/year (หรือ viewer เป็น admin/อาจารย์) ให้คืนข่าวทั้งหมดที่ผู้ใช้เพิ่ม
          return await this.newsRepository.find({
            where: { admins: { admin_id: userId } },
            relations: ['admins'],
            order: { date_last_post: 'DESC' },
            select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post','isImportant'],
          });
        }
      } else if (userType === 'อาจารย์') {
        if (viewerRoom && viewerYear) {
          return await this.newsRepository.find({
            where: [
              { lecturers: { lecturer_id: userId }, room: viewerRoom, year: viewerYear },
              { lecturers: { lecturer_id: userId }, room: 'all', year: 'all' },
              { lecturers: { lecturer_id: userId }, room: viewerRoom, year: 'all' },
              { lecturers: { lecturer_id: userId }, room: 'all', year: viewerYear },
              { lecturers: { lecturer_id: userId }, isImportant: true, room: 'all', year: 'all' },
              { lecturers: { lecturer_id: userId }, isImportant: true, room: viewerRoom, year: 'all' },
              { lecturers: { lecturer_id: userId }, isImportant: true, room: 'all', year: viewerYear },
            ],
            relations: ['lecturers'],
            order: { date_last_post: 'DESC' },
            select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post','isImportant'],
          });
        } else {
          return await this.newsRepository.find({
            where: { lecturers: { lecturer_id: userId } },
            relations: ['lecturers'],
            order: { date_last_post: 'DESC' },
            select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post','isImportant'],
          });
        }
      } else {
        // สำหรับนักศึกษาหรือประเภทอื่น ๆ เราจะคืนค่าเป็น array ว่าง
        return [];
      }
    }
  
    async findNewsById(newId: number): Promise<TbNew> {
      return this.newsRepository.findOne({
        where: { new_id: newId },
        relations: ['comments', 'comments.students', 'files', 'students','admins','lecturers'],
      });
    }

    async findAdminNews() {
      return await this.newsRepository.find({
        relations: ['comments', 'files', 'students','admins','lecturers'],
        select: ['new_id', 'title','content', 'category', 'room','year', 'date_last_post', 'coverImage','isImportant'],
        order: { date_last_post: 'DESC' }, // เรียงจากวันที่ล่าสุด
      });
    }

    async create(createTbNewDto: CreateTbNewDto, user: any): Promise<TbNew> {
      const news = this.newsRepository.create(createTbNewDto);
      news.date_last_post = new Date();
    
      // เชื่อมโยงข่าวกับผู้ส่งข่าวตามประเภทผู้ใช้
      if (user.userType === 'ผู้ดูแลระบบ') {
        // กำหนดให้เป็นข้อมูล admin
        news.admins = { admin_id: user.id } as any;
      } else if (user.userType === 'อาจารย์') {
        // กำหนดให้เป็นข้อมูล lecturer
        news.lecturers = { lecturer_id: user.id } as any;
      }
    
      const savedNews = await this.newsRepository.save(news);
    
      // ดึงข้อมูลข่าวที่บันทึกแล้ว พร้อมข้อมูลผู้ส่งข่าว (admins หรือ Lecturers)
      return await this.newsRepository.findOne({
        where: { new_id: savedNews.new_id },
        relations: ['admins', 'lecturers'],
      });
    }

    async adminUpdateNews(newId: number, updateDto: UpdateTbNewDto): Promise<TbNew> {
      // ดึงข้อมูลข่าวที่มีอยู่ก่อนการอัปเดต
      const news = await this.newsRepository.findOne({ where: { new_id: newId } });
      if (!news) {
        throw new Error('News not found');
      }
    
      // หากใน updateDto มีการส่ง coverImage: null และข่าวมีรูปหน้าปกอยู่
      if (updateDto.hasOwnProperty('coverImage') && updateDto.coverImage === null && news.coverImage) {
        // หาก path เริ่มต้นด้วย "/" ให้ตัดออก เพื่อให้ได้ relative path
        const filePath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
        const absolutePath = join(process.cwd(), filePath);
        try {
          await unlink(absolutePath);
        } catch (error) {
          // log error หากไม่สามารถลบไฟล์ได้ (เช่น ไฟล์ไม่มีอยู่จริง)
          console.error('Error deleting cover image file:', error);
        }
      }
    
      // อัปเดตข้อมูลข่าวในฐานข้อมูล
      await this.newsRepository.update(newId, updateDto);
      return await this.newsRepository.findOne({
        where: { new_id: newId },
        relations: ['admins', 'lecturers', 'students'],
      });
    }

    async updateNews(newId: number, updateDto: UpdateTbNewDto): Promise<TbNew> {
      // ดึงข้อมูลข่าวที่มีอยู่ก่อนการอัปเดต
      const news = await this.newsRepository.findOne({ where: { new_id: newId } });
      if (!news) {
        throw new Error('News not found');
      }
    
      // หากใน updateDto มีการส่ง coverImage: null และข่าวมีรูปหน้าปกอยู่
      if (updateDto.hasOwnProperty('coverImage') && updateDto.coverImage === null && news.coverImage) {
        // หาก path เริ่มต้นด้วย "/" ให้ตัดออก เพื่อให้ได้ relative path
        const filePath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
        const absolutePath = join(process.cwd(), filePath);
        try {
          await unlink(absolutePath);
        } catch (error) {
          // log error หากไม่สามารถลบไฟล์ได้ (เช่น ไฟล์ไม่มีอยู่จริง)
          console.error('Error deleting cover image file:', error);
        }
      }
    
      // อัปเดตข้อมูลข่าวในฐานข้อมูล
      await this.newsRepository.update(newId, updateDto);
      return await this.newsRepository.findOne({
        where: { new_id: newId },
        relations: ['admins', 'lecturers', 'students'],
      });
    }

    async deleteNewsAndAssociations(newId: number): Promise<void> {
      const news = await this.newsRepository.findOne({
        where: { new_id: newId },
        relations: ['files', 'comments'],
      });
      if (!news) {
        throw new NotFoundException('ข่าวไม่พบ');
      }
  
      // ลบรูปหน้าปกออกจากดิสก์ (ถ้ามี)
      if (news.coverImage) {
        const filePath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
        const absolutePath = join(process.cwd(), filePath);
        try {
          await unlink(absolutePath);
        } catch (error) {
          console.error('Error deleting cover image file:', error);
        }
      }
  
      // ลบไฟล์แนบออกจากดิสก์และลบ record ในฐานข้อมูล
      if (news.files && news.files.length > 0) {
        for (const file of news.files) {
          const filePath = file.file_path.startsWith('/') ? file.file_path.substring(1) : file.file_path;
          const absolutePath = join(process.cwd(), filePath);
          try {
            await unlink(absolutePath);
          } catch (error) {
            console.error('Error deleting file:', error);
          }
          // ลบ record ของไฟล์จากฐานข้อมูล
          await this.filesRepository.delete(file.file_id);
        }
      }
  
      // ลบคอมเมนต์ที่เกี่ยวข้องกับข่าวนี้
      if (news.comments && news.comments.length > 0) {
        await this.commentsRepository.delete({ news: { new_id: newId } });
      }
  
      // ลบข่าวออกจากฐานข้อมูล
      await this.newsRepository.delete(newId);
    }
  
    // อัปเดตเมธอดสำหรับ admin ลบข่าว
    async adminDeleteNews(newId: number): Promise<{ message: string }> {
      await this.deleteNewsAndAssociations(newId);
      return { message: 'ข่าวถูกลบเรียบร้อยแล้ว' };
    }
  
    // อัปเดตเมธอดสำหรับอาจารย์หรือผู้ดูแลระบบ ลบข่าว (ตามสิทธิ์)
    async deleteNews(newId: number): Promise<{ message: string }> {
      await this.deleteNewsAndAssociations(newId);
      return { message: 'ข่าวถูกลบเรียบร้อยแล้ว' };
    }
  

    async uploadCoverImage(newsId: number, filePath: string): Promise<void> {
      const news = await this.newsRepository.findOne({ where: { new_id: newsId } });
      if (!news) {
        throw new Error('News not found');
      }
      
      // ถ้ามีรูปหน้าปกเก่าอยู่ ให้ลบไฟล์นั้นออกจากเครื่อง
      if (news.coverImage) {
        const oldPath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
        const absoluteOldPath = join(process.cwd(), oldPath);
        try {
          await unlink(absoluteOldPath);
          console.log('Old cover image deleted successfully');
        } catch (error) {
          console.error('Error deleting old cover image file:', error);
        }
      }
    
      // อัปเดตค่า coverImage ด้วยไฟล์ใหม่
      news.coverImage = filePath;
      await this.newsRepository.save(news);
    }

  }
