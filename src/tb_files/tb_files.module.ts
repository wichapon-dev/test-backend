import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbNew } from 'src/tb_news/entities/tb_new.entity';
import { TbFiles } from './entities/tb_file.entity';
import { TbFilesService } from './tb_files.service';
import { TbFilesController } from './tb_files.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TbFiles, TbNew]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [TbFilesService],
  controllers: [TbFilesController],
})
export class TbFilesModule {}