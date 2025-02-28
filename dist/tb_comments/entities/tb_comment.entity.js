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
exports.TbComments = void 0;
const typeorm_1 = require("typeorm");
const tb_new_entity_1 = require("../../tb_news/entities/tb_new.entity");
const tb_lecturer_entity_1 = require("../../tb_lecturer/entities/tb_lecturer.entity");
const tb_admin_entity_1 = require("../../tb_admin/entities/tb_admin.entity");
const tb_student_entity_1 = require("../../tb_student/entities/tb_student.entity");
let TbComments = class TbComments {
};
exports.TbComments = TbComments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TbComments.prototype, "comments_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TbComments.prototype, "comments_detail", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], TbComments.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_student_entity_1.TbStudent, student => student.comments, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", tb_student_entity_1.TbStudent)
], TbComments.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_lecturer_entity_1.TbLecturer, lecturer => lecturer.comments, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", tb_lecturer_entity_1.TbLecturer)
], TbComments.prototype, "lecturers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_admin_entity_1.TbAdmin, admin => admin.comments, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", tb_admin_entity_1.TbAdmin)
], TbComments.prototype, "admins", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_new_entity_1.TbNew, news => news.comments, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", tb_new_entity_1.TbNew)
], TbComments.prototype, "news", void 0);
exports.TbComments = TbComments = __decorate([
    (0, typeorm_1.Entity)()
], TbComments);
//# sourceMappingURL=tb_comment.entity.js.map