import { PartialType } from '@nestjs/mapped-types';
import { CreateTbNewDto } from './create-tb_new.dto';

export class UpdateTbNewDto {
    readonly title?: string;
    readonly content?: string;
    readonly room?: string;
    readonly year?: string;
    readonly category?: string;
    readonly isImportant?: boolean;
    readonly coverImage?: string;
  }