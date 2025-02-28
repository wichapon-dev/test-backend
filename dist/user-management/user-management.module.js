"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tb_admin_entity_1 = require("../tb_admin/entities/tb_admin.entity");
const tb_lecturer_entity_1 = require("../tb_lecturer/entities/tb_lecturer.entity");
const tb_student_entity_1 = require("../tb_student/entities/tb_student.entity");
const user_management_service_1 = require("./user-management.service");
const user_management_controller_1 = require("./user-management.controller");
let UserManagementModule = class UserManagementModule {
};
exports.UserManagementModule = UserManagementModule;
exports.UserManagementModule = UserManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tb_admin_entity_1.TbAdmin, tb_lecturer_entity_1.TbLecturer, tb_student_entity_1.TbStudent])],
        controllers: [user_management_controller_1.UserManagementController],
        providers: [user_management_service_1.UserManagementService],
    })
], UserManagementModule);
//# sourceMappingURL=user-management.module.js.map