import { Controller, Get, Param, Delete } from '@nestjs/common';
import { TbRoleService } from './tb_role.service';

@Controller('tb-role')
export class TbRoleController {
  constructor(private readonly tbRoleService: TbRoleService) {}

  @Get('all')
  findAll() {
    return this.tbRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tbRoleService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tbRoleService.remove(+id);
  }
}
