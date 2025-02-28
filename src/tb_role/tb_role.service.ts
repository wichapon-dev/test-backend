import { Injectable } from '@nestjs/common';

@Injectable()
export class TbRoleService {

  findAll() {
    return `This action returns all tbRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tbRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} tbRole`;
  }
}
