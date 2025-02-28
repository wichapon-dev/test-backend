"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbNewsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tb_news_service_1 = require("./tb_news.service");
const tb_news_controller_1 = require("./tb_news.controller");
const tb_new_entity_1 = require("./entities/tb_new.entity");
const tb_file_entity_1 = require("../tb_files/entities/tb_file.entity");
const tb_comment_entity_1 = require("../tb_comments/entities/tb_comment.entity");
const tb_student_entity_1 = require("../tb_student/entities/tb_student.entity");
const tb_lecturer_entity_1 = require("../tb_lecturer/entities/tb_lecturer.entity");
const tb_admin_entity_1 = require("../tb_admin/entities/tb_admin.entity");
let TbNewsModule = class TbNewsModule {
};
exports.TbNewsModule = TbNewsModule;
exports.TbNewsModule = TbNewsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tb_new_entity_1.TbNew, tb_file_entity_1.TbFiles, tb_student_entity_1.TbStudent, tb_comment_entity_1.TbComments, tb_lecturer_entity_1.TbLecturer, tb_admin_entity_1.TbAdmin])],
        controllers: [tb_news_controller_1.TbNewsController],
        providers: [tb_news_service_1.TbNewsService],
        exports: [typeorm_1.TypeOrmModule, tb_news_service_1.TbNewsService],
    })
], TbNewsModule);
//# sourceMappingURL=tb_news.module.js.map