import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
// สมมติว่า JwtAuthGuard มีอยู่แล้ว
import { AdminGuard } from 'src/auth/admin.guard';
import { UserActivityService } from './user-activity.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @UseGuards(LocalAuthGuard, AdminGuard)
  @Get('latest')
  async getLatestUsers() {
    return await this.userActivityService.getLatestUsers();
  }

  // Endpoint สำหรับ heartbeat
  @UseGuards(LocalAuthGuard)
  @Post('heartbeat')
  async heartbeat(@Req() req: Request) {
    // req.user จะถูก set จาก JwtAuthGuard (ควรมีข้อมูล userType, id, etc.)
    await this.userActivityService.updateHeartbeat(req.user);
    return { message: 'Heartbeat updated' };
  }

  @UseGuards(LocalAuthGuard, AdminGuard)
  @Get('statistics')
  async getRoleUsageStatistics() {
    return await this.userActivityService.getRoleUsageStatistics();
  }
  
}
