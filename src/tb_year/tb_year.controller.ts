import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TbYearService } from './tb_year.service';


@Controller('tb-year')
export class TbYearController {
  constructor(private readonly tbYearService: TbYearService) {}

}
