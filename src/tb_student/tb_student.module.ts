import { Module } from '@nestjs/common';
import { TbStudentService } from './tb_student.service';
import { TbStudentController } from './tb_student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbStudent } from './entities/tb_student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TbStudent])
  
  ],
  controllers: [TbStudentController],
  providers: [TbStudentService],
    exports: [TypeOrmModule, TbStudentService],
})
export class TbStudentModule {}
