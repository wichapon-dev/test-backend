import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TbAdminService } from './tb_admin.service';
import { signupDto } from './dto/admin-signup.dto';

@Controller('tb-admin')
export class TbAdminController {
  constructor(private readonly tbAdminService: TbAdminService) {}

 @Post('signup')
   async signup(@Body() signupDto: signupDto) {
     return this.tbAdminService.create(signupDto);
   }

}
