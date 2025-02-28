// dto/create-tb_new.dto.ts
import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateTbNewDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  room: string;

  @IsString()
  year: string;

  @IsString()
  category: string;

  @IsBoolean()
  isImportant: boolean;

  @IsDateString()
  date_last_post: Date;
}
