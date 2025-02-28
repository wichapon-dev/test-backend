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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const tb_admin_entity_1 = require("../tb_admin/entities/tb_admin.entity");
const tb_lecturer_entity_1 = require("../tb_lecturer/entities/tb_lecturer.entity");
const tb_student_entity_1 = require("../tb_student/entities/tb_student.entity");
let UserActivityService = class UserActivityService {
    constructor(adminRepo, lecturerRepo, studentRepo) {
        this.adminRepo = adminRepo;
        this.lecturerRepo = lecturerRepo;
        this.studentRepo = studentRepo;
    }
    async getLatestUsers() {
        const admins = await this.adminRepo.find({
            select: ['admin_id', 'admin_email', 'admin_fname', 'admin_lname', 'last_active', 'profile_image'],
            order: { last_active: 'DESC' },
        });
        const lecturers = await this.lecturerRepo.find({
            select: ['lecturer_id', 'lecturer_email', 'lecturer_fname', 'lecturer_lname', 'last_active', 'profile_image'],
            order: { last_active: 'DESC' },
        });
        const students = await this.studentRepo.find({
            select: ['student_id', 'student_email', 'student_fname', 'student_lname', 'last_active', 'profile_image'],
            relations: ['room', 'year'],
            order: { last_active: 'DESC' },
        });
        const unified = [
            ...admins.map(a => ({
                id: a.admin_id,
                email: a.admin_email,
                firstName: a.admin_fname,
                lastName: a.admin_lname,
                userType: 'ผู้ดูแลระบบ',
                lastActive: a.last_active,
                profileImage: a.profile_image || '/default-avatar.png',
                room: 'N/A',
                academicYear: 'N/A',
            })),
            ...lecturers.map(l => ({
                id: l.lecturer_id,
                email: l.lecturer_email,
                firstName: l.lecturer_fname,
                lastName: l.lecturer_lname,
                userType: 'อาจารย์',
                lastActive: l.last_active,
                profileImage: l.profile_image || '/default-avatar.png',
                room: 'N/A',
                academicYear: 'N/A',
            })),
            ...students.map(s => ({
                id: s.student_id,
                email: s.student_email,
                firstName: s.student_fname,
                lastName: s.student_lname,
                userType: 'นักศึกษา',
                lastActive: s.last_active,
                profileImage: s.profile_image || '/default-avatar.png',
                room: s.room?.room_name || 'N/A',
                academicYear: s.year?.year_name || 'N/A',
            })),
        ];
        unified.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
        const now = new Date();
        const threshold = 5 * 60 * 1000;
        const result = unified.map(user => ({
            ...user,
            online: now.getTime() - new Date(user.lastActive).getTime() < threshold,
        }));
        return result;
    }
    async updateHeartbeat(user) {
        const now = new Date();
        if (user.userType === 'ผู้ดูแลระบบ') {
            await this.adminRepo.update(user.id, { last_active: now });
        }
        else if (user.userType === 'อาจารย์') {
            await this.lecturerRepo.update(user.id, { last_active: now });
        }
        else if (user.userType === 'นักศึกษา') {
            await this.studentRepo.update(user.id, { last_active: now });
        }
    }
    async getRoleUsageStatistics() {
        const adminCount = await this.adminRepo.count();
        const lecturerCount = await this.lecturerRepo.count();
        const studentCount = await this.studentRepo.count();
        return {
            admin: adminCount,
            lecturer: lecturerCount,
            student: studentCount,
        };
    }
};
exports.UserActivityService = UserActivityService;
exports.UserActivityService = UserActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(tb_admin_entity_1.TbAdmin)),
    __param(1, (0, typeorm_2.InjectRepository)(tb_lecturer_entity_1.TbLecturer)),
    __param(2, (0, typeorm_2.InjectRepository)(tb_student_entity_1.TbStudent)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UserActivityService);
//# sourceMappingURL=user-activity.service.js.map