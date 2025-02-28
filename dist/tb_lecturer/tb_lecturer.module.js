"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbLecturerModule = void 0;
const common_1 = require("@nestjs/common");
const tb_lecturer_service_1 = require("./tb_lecturer.service");
const tb_lecturer_controller_1 = require("./tb_lecturer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tb_lecturer_entity_1 = require("./entities/tb_lecturer.entity");
let TbLecturerModule = class TbLecturerModule {
};
exports.TbLecturerModule = TbLecturerModule;
exports.TbLecturerModule = TbLecturerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tb_lecturer_entity_1.TbLecturer])],
        controllers: [tb_lecturer_controller_1.TbLecturerController],
        providers: [tb_lecturer_service_1.TbLecturerService],
        exports: [typeorm_1.TypeOrmModule, tb_lecturer_service_1.TbLecturerService],
    })
], TbLecturerModule);
//# sourceMappingURL=tb_lecturer.module.js.map