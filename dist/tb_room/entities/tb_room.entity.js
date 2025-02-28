"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbRoom = void 0;
const typeorm_1 = require("typeorm");
const tb_student_entity_1 = require("../../tb_student/entities/tb_student.entity");
let TbRoom = class TbRoom {
};
exports.TbRoom = TbRoom;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TbRoom.prototype, "room_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TbRoom.prototype, "room_name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_student_entity_1.TbStudent, student => student.room),
    __metadata("design:type", Array)
], TbRoom.prototype, "students", void 0);
exports.TbRoom = TbRoom = __decorate([
    (0, typeorm_1.Entity)()
], TbRoom);
//# sourceMappingURL=tb_room.entity.js.map