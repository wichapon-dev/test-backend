import { Module } from '@nestjs/common';
import { TbRoomService } from './tb_room.service';
import { TbRoomController } from './tb_room.controller';

@Module({
  controllers: [TbRoomController],
  providers: [TbRoomService],
})
export class TbRoomModule {}
