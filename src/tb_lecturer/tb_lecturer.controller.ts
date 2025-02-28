import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TbLecturerService } from './tb_lecturer.service';
import { signupDto } from './dto/lecturer-signup.dto';


@Controller('tb-lecturer')
export class TbLecturerController {
  constructor(private readonly tbLecturerService: TbLecturerService) {}

   @Post('signup')
    async signup(@Body() signupDto: signupDto) {
      return this.tbLecturerService.create(signupDto);
    }
 
}
