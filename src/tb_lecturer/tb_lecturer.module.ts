import { Module } from '@nestjs/common';
import { TbLecturerService } from './tb_lecturer.service';
import { TbLecturerController } from './tb_lecturer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbLecturer } from './entities/tb_lecturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TbLecturer])],
  controllers: [TbLecturerController],
  providers: [TbLecturerService],
  exports: [TypeOrmModule, TbLecturerService],
})
export class TbLecturerModule {}
