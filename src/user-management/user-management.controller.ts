import { Controller, Get, Post, Put, Delete, Body, Param, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Get()
  async getUsers() {
    return await this.userManagementService.getAllUsers();
  }

  // สร้างผู้ใช้ใหม่ โดยรองรับการอัปโหลดไฟล์สำหรับ profileImage
  @Post()
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads/profile',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async createUser(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
    if (file) {
      // กำหนดค่า profileImage ให้เป็น URL ที่สามารถเข้าถึงไฟล์ได้
      data.profileImage = `/uploads/profile/${file.filename}`;
    }
    return await this.userManagementService.createUser(data);
  }

  // อัปเดตผู้ใช้ (รองรับการอัปโหลดไฟล์สำหรับ profileImage)
  @Put(':id')
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads/profile',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async updateUser(
    @Param('id') id: string,
    @Query('userType') userType: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: any,
  ) {
    if (file) {
      data.profileImage = `/uploads/profile/${file.filename}`;
    }
    return await this.userManagementService.updateUser(+id, userType, data);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Query('userType') userType: string,
  ) {
    return await this.userManagementService.deleteUser(+id, userType);
  }

  @Get(':userType/:id')
  async getUserProfile(
    @Param('userType') userType: string,
    @Param('id') id: string,
  ) {
    return await this.userManagementService.getUserProfile(+id, userType);
  }

}
