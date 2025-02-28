import { Module } from '@nestjs/common';
import { TbYearService } from './tb_year.service';
import { TbYearController } from './tb_year.controller';

@Module({
  controllers: [TbYearController],
  providers: [TbYearService],
})
export class TbYearModule {}
