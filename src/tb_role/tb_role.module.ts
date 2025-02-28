import { Module } from '@nestjs/common';
import { TbRoleService } from './tb_role.service';
import { TbRoleController } from './tb_role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TbRole } from './entities/tb_role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TbRole])],
  controllers: [TbRoleController],
  providers: [TbRoleService],
})
export class TbRoleModule {}
