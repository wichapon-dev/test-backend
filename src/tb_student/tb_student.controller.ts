import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TbStudentService } from './tb_student.service';
import { signupDto } from './dto/student-signup.dto';


@Controller('tb-student')
export class TbStudentController {
  constructor(private readonly tbStudentService: TbStudentService) {}

   @Post('signup')
   async signup(@Body() signupDto: signupDto) {
     return this.tbStudentService.create(signupDto);
   }
}
