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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const tb_student_service_1 = require("../tb_student/tb_student.service");
const tb_admin_service_1 = require("../tb_admin/tb_admin.service");
const tb_lecturer_service_1 = require("../tb_lecturer/tb_lecturer.service");
let AuthService = class AuthService {
    constructor(tbStudentService, tbAdminService, tbLecturerService, jwtService) {
        this.tbStudentService = tbStudentService;
        this.tbAdminService = tbAdminService;
        this.tbLecturerService = tbLecturerService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const admin = await this.tbAdminService.findOne(email);
        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.admin_password);
            if (isMatch) {
                const now = new Date();
                admin.last_active = now;
                await this.tbAdminService.updateLastActive(admin.admin_id, now);
                return {
                    id: admin.admin_id,
                    email: admin.admin_email,
                    firstName: admin.admin_fname,
                    lastName: admin.admin_lname,
                    role: admin.role?.role_access,
                    userType: 'ผู้ดูแลระบบ',
                    image: admin.profile_image,
                };
            }
        }
        const lecturer = await this.tbLecturerService.findOne(email);
        if (lecturer) {
            const isMatch = await bcrypt.compare(password, lecturer.lecturer_password);
            if (isMatch) {
                const now = new Date();
                lecturer.last_active = now;
                await this.tbLecturerService.updateLastActive(lecturer.lecturer_id, now);
                return {
                    id: lecturer.lecturer_id,
                    email: lecturer.lecturer_email,
                    firstName: lecturer.lecturer_fname,
                    lastName: lecturer.lecturer_lname,
                    role: lecturer.role?.role_access,
                    userType: 'อาจารย์',
                    image: lecturer.profile_image,
                };
            }
        }
        const student = await this.tbStudentService.findOne(email);
        if (student) {
            const isMatch = await bcrypt.compare(password, student.student_password);
            if (isMatch) {
                const now = new Date();
                student.last_active = now;
                await this.tbStudentService.updateLastActive(student.student_id, now);
                return {
                    id: student.student_id,
                    email: student.student_email,
                    firstName: student.student_fname,
                    lastName: student.student_lname,
                    role: student.role?.role_access,
                    userType: 'นักศึกษา',
                    room: student.room?.room_name,
                    year: student.year?.year_name,
                    image: student.profile_image,
                };
            }
        }
        return null;
    }
    async login(user) {
        const payload = user;
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tb_student_service_1.TbStudentService,
        tb_admin_service_1.TbAdminService,
        tb_lecturer_service_1.TbLecturerService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map