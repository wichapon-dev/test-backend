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
exports.TbRole = void 0;
const typeorm_1 = require("typeorm");
const tb_admin_entity_1 = require("../../tb_admin/entities/tb_admin.entity");
const tb_lecturer_entity_1 = require("../../tb_lecturer/entities/tb_lecturer.entity");
const tb_student_entity_1 = require("../../tb_student/entities/tb_student.entity");
let TbRole = class TbRole {
};
exports.TbRole = TbRole;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TbRole.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], TbRole.prototype, "role_access", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_student_entity_1.TbStudent, student => student.role),
    __metadata("design:type", Array)
], TbRole.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_lecturer_entity_1.TbLecturer, lecturer => lecturer.role),
    __metadata("design:type", Array)
], TbRole.prototype, "lecturers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tb_admin_entity_1.TbAdmin, admin => admin.role),
    __metadata("design:type", Array)
], TbRole.prototype, "admins", void 0);
exports.TbRole = TbRole = __decorate([
    (0, typeorm_1.Entity)()
], TbRole);
//# sourceMappingURL=tb_role.entity.js.map