import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTbCommentDto {
  @IsNotEmpty()
  @IsString()
  comments_detail: string;

  @IsNotEmpty()
  @IsInt()
  newsId: number;
}