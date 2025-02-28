import { PartialType } from '@nestjs/mapped-types';
import { CreateTbCommentDto } from './create-tb_comment.dto';

export class UpdateTbCommentDto extends PartialType(CreateTbCommentDto) {}
