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
exports.TbLecturer = void 0;
const typeorm_1 = require("typeorm");
const tb_role_entity_1 = require("../../tb_role/entities/tb_role.entity");
const tb_comment_entity_1 = require("../../tb_comments/entities/tb_comment.entity");
const tb_new_entity_1 = require("../../tb_news/entities/tb_new.entity");
let TbLecturer = class TbLecturer {
};
exports.TbLecturer = TbLecturer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TbLecturer.prototype, "lecturer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_fname', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TbLecturer.prototype, "lecturer_fname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_lname', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TbLecturer.prototype, "lecturer_lname", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TbLecturer.prototype, "lecturer_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TbLecturer.prototype, "lecturer_password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], TbLecturer.prototype, "last_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], TbLecturer.prototype, "profile_image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_role_entity_1.TbRole, (role) => role.lecturers),
    __metadata("design:type", tb_role_entity_1.TbRole)
], TbLecturer.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_comment_entity_1.TbComments, (comments) => comments.lecturers),
    __metadata("design:type", Array)
], TbLecturer.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_new_entity_1.TbNew, (news) => news.lecturers),
    __metadata("design:type", Array)
], TbLecturer.prototype, "news", void 0);
exports.TbLecturer = TbLecturer = __decorate([
    (0, typeorm_1.Entity)()
], TbLecturer);
//# sourceMappingURL=tb_lecturer.entity.js.map