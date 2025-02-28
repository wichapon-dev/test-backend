import { Module } from '@nestjs/common';
import { TbAdminService } from './tb_admin.service';
import { TbAdminController } from './tb_admin.controller';
import { TbAdmin } from './entities/tb_admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TbAdmin])],
  controllers: [TbAdminController],
  providers: [TbAdminService],
  exports: [TypeOrmModule, TbAdminService],
})
export class TbAdminModule {}
