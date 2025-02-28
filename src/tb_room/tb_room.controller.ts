import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TbRoomService } from './tb_room.service'

@Controller('tb-room')
export class TbRoomController {
  constructor(private readonly tbRoomService: TbRoomService) {}

}
