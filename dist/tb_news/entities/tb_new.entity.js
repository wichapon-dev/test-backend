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
exports.TbNew = void 0;
const typeorm_1 = require("typeorm");
const tb_comment_entity_1 = require("../../tb_comments/entities/tb_comment.entity");
const tb_file_entity_1 = require("../../tb_files/entities/tb_file.entity");
const tb_lecturer_entity_1 = require("../../tb_lecturer/entities/tb_lecturer.entity");
const tb_student_entity_1 = require("../../tb_student/entities/tb_student.entity");
const tb_admin_entity_1 = require("../../tb_admin/entities/tb_admin.entity");
let TbNew = class TbNew {
};
exports.TbNew = TbNew;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TbNew.prototype, "new_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TbNew.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TbNew.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'all' }),
    __metadata("design:type", String)
], TbNew.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'all' }),
    __metadata("design:type", String)
], TbNew.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: 'general' }),
    __metadata("design:type", String)
], TbNew.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], TbNew.prototype, "isImportant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_comment_entity_1.TbComments, comments => comments.news),
    __metadata("design:type", Array)
], TbNew.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_file_entity_1.TbFiles, files => files.news),
    __metadata("design:type", Array)
], TbNew.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], TbNew.prototype, "date_last_post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_student_entity_1.TbStudent, student => student.news, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", tb_student_entity_1.TbStudent)
], TbNew.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_lecturer_entity_1.TbLecturer, lecturer => lecturer.news, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", tb_lecturer_entity_1.TbLecturer)
], TbNew.prototype, "lecturers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_admin_entity_1.TbAdmin, admin => admin.news, { onDelete: 'SET NULL', nullable: true }),
    __metadata("design:type", tb_admin_entity_1.TbAdmin)
], TbNew.prototype, "admins", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TbNew.prototype, "coverImage", void 0);
exports.TbNew = TbNew = __decorate([
    (0, typeorm_1.Entity)()
], TbNew);
//# sourceMappingURL=tb_new.entity.js.map