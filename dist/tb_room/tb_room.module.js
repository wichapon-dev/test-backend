"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbRoomModule = void 0;
const common_1 = require("@nestjs/common");
const tb_room_service_1 = require("./tb_room.service");
const tb_room_controller_1 = require("./tb_room.controller");
let TbRoomModule = class TbRoomModule {
};
exports.TbRoomModule = TbRoomModule;
exports.TbRoomModule = TbRoomModule = __decorate([
    (0, common_1.Module)({
        controllers: [tb_room_controller_1.TbRoomController],
        providers: [tb_room_service_1.TbRoomService],
    })
], TbRoomModule);
//# sourceMappingURL=tb_room.module.js.map