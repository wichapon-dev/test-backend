import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TbNewsService } from './tb_news.service';
import { CreateTbNewDto } from './dto/create-tb_new.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TbNew } from './entities/tb_new.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { Response } from 'express'; // เพิ่มการอิมพอร์ต Response
import { join } from 'path'; // เพิ่มการใช้งาน join สำหรับการจัดการ path
import { UpdateTbNewDto } from './dto/update-tb_new.dto';

@Controller('tb-news')
export class TbNewsController {
  constructor(private readonly tbNewsService: TbNewsService) {}

  @Get('admin-news')
  async findAdminNews() {
    return await this.tbNewsService.findAdminNews();
  }

  @Get('new-news')
  async findNewNews() {
    return await this.tbNewsService.findNewNews();
  }

  @Get('important')
  async findNewsImportant() {
    return await this.tbNewsService.findImportant();
  }

  @Get('activity')
  async findNewsActivity() {
    return await this.tbNewsService.findNewsActivity();
  }

  @Get('scholarship')
  async findNewsScholarShip() {
    return await this.tbNewsService.findNewsScholarShip();
  }

  @UseGuards(LocalAuthGuard)
  @Get('new-news-room')
  async findNewNewsLogin(@Request() req) {
    const user = req.user;
    // ถ้าเป็นผู้ดูแลระบบหรืออาจารย์ ให้ใช้เมธอดที่รวม global news กับข่าวที่ตัวเองเพิ่ม
    if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
      return await this.tbNewsService.findGlobalAndMyNews(user);
    } else {
      // สำหรับนักศึกษาหรือผู้ใช้ประเภทอื่น ให้ใช้การดึงข่าวแบบเดิม (ตามห้องและปี)
      const studentRoom = req.user?.room;
      const studentYear = req.user?.year;
      return await this.tbNewsService.findNewNewsAll(studentRoom, studentYear);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('important-room')
  async findNewsImportantRoom(@Request() req) {
    const user = req.user;
    if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
      // หากเป็นผู้ดูแลระบบหรืออาจารย์ ให้ดึงข่าวสำคัญแบบ global และข่าวที่ตัวเองเพิ่ม
      return await this.tbNewsService.findImportantGlobalAndMyNews(user);
    } else {
      // สำหรับนักศึกษา ให้ดึงข่าวสำคัญตามเงื่อนไขเดิม (filter ด้วย room และ year)
      const studentRoom = req.user?.room;
      const studentYear = req.user?.year;
      return await this.tbNewsService.findNewsImportantRoomAll(
        studentRoom,
        studentYear,
      );
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('inclass')
  async findNewsInClassAll(@Request() req) {
    const studentRoom = req.user?.room; // ตรวจสอบว่าผู้ใช้ล็อกอินหรือไม่
    const studentYear = req.user?.year;
    console.log(studentYear)
    // หากผู้ใช้ล็อกอินให้แสดงข่าวจากห้องผู้ใช้และข่าวจาก 'all'
    return await this.tbNewsService.findNewsInClassAll(
      studentRoom,
      studentYear,
    );
  }

  @UseGuards(LocalAuthGuard)
  @Get('activity/login')
  async findNewsActivityAll(@Request() req) {
    const user = req.user;
    if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
      return await this.tbNewsService.findActivityGlobalAndMyNews(user);
    } else {
      // สำหรับนักศึกษาให้ใช้เงื่อนไขเดิมที่อิงกับ room และ year
      const studentRoom = req.user?.room;
      const studentYear = req.user?.year;
      return await this.tbNewsService.findNewsActivityAll(
        studentRoom,
        studentYear,
      );
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('scholarship/login')
  async findNewsScholarShipAll(@Request() req) {
    const user = req.user;
    if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
      // หากเป็นผู้ดูแลระบบหรืออาจารย์ ให้ดึงข่าวทุนแบบ global และข่าวที่ตัวเองเพิ่ม
      return await this.tbNewsService.findScholarshipGlobalAndMyNews(user);
    } else {
      // สำหรับนักศึกษา ให้ใช้เงื่อนไขเดิมตาม room และ year
      const studentRoom = req.user?.room;
      const studentYear = req.user?.year;
      return await this.tbNewsService.findNewsScholarShipAll(
        studentRoom,
        studentYear,
      );
    }
  }

  @UseGuards(LocalAuthGuard)
  @Get('my-news')
  async findMyNews(@Request() req) {
    const user = req.user;
    return await this.tbNewsService.findMyNews(user);
  }

  @Get('search')
  async searchNews(@Query('query') query: string): Promise<TbNew[]> {
    return this.tbNewsService.searchNews(query);
  }

  @Get('user/:userType/:userId')
  async findNewsByUser(
    @Param('userType') userType: string,
    @Param('userId') userId: number,
    @Query('room') viewerRoom: string,
    @Query('year') viewerYear: string,
  ): Promise<TbNew[]> {
    return await this.tbNewsService.findNewsByUser(
      userType,
      userId,
      viewerRoom,
      viewerYear,
    );
  }

  @Get(':newId')
  async findNewsDetail(@Param('newId') newId: number) {
    return await this.tbNewsService.findNewsById(newId);
  }

  @Get('file/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = `./uploads/${filename}`; // เส้นทางไฟล์ที่จัดเก็บ
    return res.sendFile(filePath, { root: '.' }); // ส่งไฟล์กลับไปให้ผู้ใช้
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  async create(@Body() createTbNewDto: CreateTbNewDto, @Request() req) {
    const user = req.user;
    if (user.userType !== 'ผู้ดูแลระบบ' && user.userType !== 'อาจารย์') {
      throw new ForbiddenException(
        'เฉพาะ ผู้ดูแลระบบ และ อาจาร์ย เท่านั้นที่สามารถแจ้งข่าวได้',
      );
    }
    return this.tbNewsService.create(createTbNewDto, user);
  }

  @UseGuards(LocalAuthGuard)
  @Patch('admin/:newId')
  async adminUpdateNews(
    @Param('newId') newId: number,
    @Body() updateDto: UpdateTbNewDto,
    @Request() req,
  ) {
    const user = req.user;
    if (user.userType !== 'ผู้ดูแลระบบ') {
      throw new ForbiddenException(
        'เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถแก้ไขข่าวได้',
      );
    }
    return await this.tbNewsService.adminUpdateNews(newId, updateDto);
  }

  @UseGuards(LocalAuthGuard)
  @Patch(':newId')
  async updateNews(
    @Param('newId') newId: number,
    @Body() updateDto: UpdateTbNewDto,
    @Request() req,
  ) {
    const user = req.user;
    if (user.userType !== 'ผู้ดูแลระบบ' && user.userType !== 'อาจารย์') {
      throw new ForbiddenException(
        'เฉพาะ ผู้ดูแลระบบ และ อาจารย์ เท่านั้นที่สามารถแก้ไขข่าวได้',
      );
    }

    // ดึงข่าวที่ต้องการแก้ไข
    const news = await this.tbNewsService.findNewsById(newId);
    if (!news) {
      throw new NotFoundException('ไม่พบข่าวที่ต้องการแก้ไข');
    }

    // ตรวจสอบว่าเจ้าของข่าวตรงกับผู้ใช้ที่ล็อกอินอยู่หรือไม่
    if (user.userType === 'ผู้ดูแลระบบ' && news.admins?.admin_id !== user.id) {
      throw new ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
    } else if (
      user.userType === 'อาจารย์' &&
      news.lecturers?.lecturer_id !== user.id
    ) {
      throw new ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
    }

    return await this.tbNewsService.updateNews(newId, updateDto);
  }

  // ** เพิ่ม endpoint สำหรับ admin ในการลบข่าวสาร **
  @UseGuards(LocalAuthGuard)
  @Delete('admin/:newId')
  async adminDeleteNews(@Param('newId') newId: number, @Request() req) {
    const user = req.user;
    if (user.userType !== 'ผู้ดูแลระบบ') {
      throw new ForbiddenException(
        'เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถลบข่าวได้',
      );
    }
    return await this.tbNewsService.adminDeleteNews(newId);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':newId')
  async deleteNews(@Param('newId') newId: number, @Request() req) {
    const user = req.user;
    if (user.userType !== 'ผู้ดูแลระบบ' && user.userType !== 'อาจารย์') {
      throw new ForbiddenException(
        'เฉพาะ ผู้ดูแลระบบ และ อาจารย์ เท่านั้นที่สามารถลบข่าวได้',
      );
    }

    // ดึงข่าวที่ต้องการลบ
    const news = await this.tbNewsService.findNewsById(newId);
    if (!news) {
      throw new NotFoundException('ไม่พบข่าวที่ต้องการลบ');
    }

    // ตรวจสอบว่าเจ้าของข่าวตรงกับผู้ใช้ที่ล็อกอินอยู่หรือไม่
    if (user.userType === 'ผู้ดูแลระบบ' && news.admins?.admin_id !== user.id) {
      throw new ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
    } else if (
      user.userType === 'อาจารย์' &&
      news.lecturers?.lecturer_id !== user.id
    ) {
      throw new ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
    }

    return await this.tbNewsService.deleteNews(newId);
  }

  @Post(':newId/upload-cover-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/coverimage',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const fileName = `${Date.now()}${fileExtName}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async uploadCoverImage(
    @Param('newId') newId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filePath = `/uploads/coverimage/${file.filename}`;
    await this.tbNewsService.uploadCoverImage(newId, filePath);
    return { message: 'Cover image uploaded successfully' };
  }
}
