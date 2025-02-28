import { Controller, Get, Post, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { TbCommentsService } from './tb_comments.service';
import { CreateTbCommentDto } from './dto/create-tb_comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tb-comments')
export class TbCommentsController {
  constructor(private readonly commentsService: TbCommentsService) {}

  // ดึงคอมเมนต์ของข่าว (รวมความสัมพันธ์ของผู้โพสต์)
  @Get('news/:newsId')
  async findCommentsByNews(@Param('newsId') newsId: number) {
    return this.commentsService.findNews(newsId);
  }

  // โพสต์คอมเมนต์ใหม่ (ต้องมี JWT ใน header)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createComment(@Body() createCommentDto: CreateTbCommentDto, @Request() req) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.commentsService.create(createCommentDto, user);
  }
}
