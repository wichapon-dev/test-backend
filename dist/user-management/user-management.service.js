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
exports.UserManagementService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tb_admin_entity_1 = require("../tb_admin/entities/tb_admin.entity");
const tb_lecturer_entity_1 = require("../tb_lecturer/entities/tb_lecturer.entity");
const tb_student_entity_1 = require("../tb_student/entities/tb_student.entity");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path_1 = require("path");
let UserManagementService = class UserManagementService {
    constructor(adminRepository, lecturerRepository, studentRepository) {
        this.adminRepository = adminRepository;
        this.lecturerRepository = lecturerRepository;
        this.studentRepository = studentRepository;
    }
    async getAllUsers() {
        const admins = await this.adminRepository.find();
        const lecturers = await this.lecturerRepository.find();
        const students = await this.studentRepository.find({ relations: ['room', 'year'] });
        const adminList = admins.map(admin => ({
            id: admin.admin_id,
            userType: 'ผู้ดูแลระบบ',
            firstName: admin.admin_fname,
            lastName: admin.admin_lname,
            email: admin.admin_email,
            profileImage: admin.profile_image,
            room: null,
            academicYear: null,
        }));
        const lecturerList = lecturers.map(lecturer => ({
            id: lecturer.lecturer_id,
            userType: 'อาจารย์',
            firstName: lecturer.lecturer_fname,
            lastName: lecturer.lecturer_lname,
            email: lecturer.lecturer_email,
            profileImage: lecturer.profile_image,
            room: null,
            academicYear: null,
        }));
        const studentList = students.map(student => ({
            id: student.student_id,
            userType: 'นักศึกษา',
            firstName: student.student_fname,
            lastName: student.student_lname,
            email: student.student_email,
            profileImage: student.profile_image,
            room: student.room ? student.room.room_name : null,
            roomId: student.room ? student.room.room_id : null,
            academicYear: student.year ? student.year.year_name : null,
            academicYearId: student.year ? student.year.year_id : null,
        }));
        return [...adminList, ...lecturerList, ...studentList];
    }
    async createUser(data) {
        const { userType, firstName, lastName, email, profileImage, room, academicYear, password, role } = data;
        const plainPassword = password ? password : '123456';
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        if (userType === 'ผู้ดูแลระบบ') {
            const newAdmin = this.adminRepository.create({
                admin_fname: firstName,
                admin_lname: lastName,
                admin_email: email,
                admin_password: hashedPassword,
                profile_image: profileImage,
                role: role ? { role_id: +role } : undefined,
            });
            return await this.adminRepository.save(newAdmin);
        }
        else if (userType === 'อาจารย์') {
            const newLecturer = this.lecturerRepository.create({
                lecturer_fname: firstName,
                lecturer_lname: lastName,
                lecturer_email: email,
                lecturer_password: hashedPassword,
                profile_image: profileImage,
                role: role ? { role_id: +role } : undefined,
            });
            return await this.lecturerRepository.save(newLecturer);
        }
        else if (userType === 'นักศึกษา') {
            const newStudent = this.studentRepository.create({
                student_fname: firstName,
                student_lname: lastName,
                student_email: email,
                student_password: hashedPassword,
                profile_image: profileImage,
                role: role ? { role_id: +role } : undefined,
            });
            if (room) {
                newStudent.room = { room_id: +room };
            }
            if (academicYear) {
                newStudent.year = { year_id: +academicYear };
            }
            return await this.studentRepository.save(newStudent);
        }
        else {
            throw new Error('Invalid userType');
        }
    }
    deleteOldFile(filePath) {
        const relativePath = filePath.startsWith('/') ? filePath.substr(1) : filePath;
        const fullPath = (0, path_1.join)(process.cwd(), relativePath);
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
        }
    }
    async updateUser(id, userType, data) {
        if (userType === 'ผู้ดูแลระบบ') {
            if (data.profileImage) {
                const admin = await this.adminRepository.findOneBy({ admin_id: id });
                if (admin && admin.profile_image && admin.profile_image !== data.profileImage) {
                    this.deleteOldFile(admin.profile_image);
                }
            }
            const updateData = {
                admin_fname: data.firstName,
                admin_lname: data.lastName,
                admin_email: data.email,
                profile_image: data.profileImage,
            };
            if (data.password) {
                updateData.admin_password = await bcrypt.hash(data.password, 10);
            }
            if (data.role) {
                updateData.role = { role_id: +data.role };
            }
            await this.adminRepository.update(id, updateData);
            return await this.adminRepository.findOneBy({ admin_id: id });
        }
        else if (userType === 'อาจารย์') {
            if (data.profileImage) {
                const lecturer = await this.lecturerRepository.findOneBy({ lecturer_id: id });
                if (lecturer && lecturer.profile_image && lecturer.profile_image !== data.profileImage) {
                    this.deleteOldFile(lecturer.profile_image);
                }
            }
            const updateData = {
                lecturer_fname: data.firstName,
                lecturer_lname: data.lastName,
                lecturer_email: data.email,
                profile_image: data.profileImage,
            };
            if (data.password) {
                updateData.lecturer_password = await bcrypt.hash(data.password, 10);
            }
            if (data.role) {
                updateData.role = { role_id: +data.role };
            }
            await this.lecturerRepository.update(id, updateData);
            return await this.lecturerRepository.findOneBy({ lecturer_id: id });
        }
        else if (userType === 'นักศึกษา') {
            if (data.profileImage) {
                const student = await this.studentRepository.findOne({
                    where: { student_id: id },
                    relations: ['room', 'year'],
                });
                if (student && student.profile_image && student.profile_image !== data.profileImage) {
                    this.deleteOldFile(student.profile_image);
                }
            }
            const updateData = {
                student_fname: data.firstName,
                student_lname: data.lastName,
                student_email: data.email,
                profile_image: data.profileImage,
            };
            if (data.password) {
                updateData.student_password = await bcrypt.hash(data.password, 10);
            }
            if (data.role) {
                updateData.role = { role_id: +data.role };
            }
            if (data.room) {
                updateData.room = { room_id: +data.room };
            }
            if (data.academicYear) {
                updateData.year = { year_id: +data.academicYear };
            }
            await this.studentRepository.update(id, updateData);
            return await this.studentRepository.findOne({
                where: { student_id: id },
                relations: ['room', 'year'],
            });
        }
        else {
            throw new Error('Invalid userType');
        }
    }
    async deleteUser(id, userType) {
        if (userType === 'admin') {
            return await this.adminRepository.delete(id);
        }
        else if (userType === 'อาจารย์') {
            return await this.lecturerRepository.delete(id);
        }
        else if (userType === 'นักศึกษา') {
            return await this.studentRepository.delete(id);
        }
        else {
            throw new Error('Invalid userType');
        }
    }
    async getUserProfile(id, userType) {
        if (userType === 'ผู้ดูแลระบบ') {
            const admin = await this.adminRepository.findOneBy({ admin_id: id });
            if (!admin)
                throw new Error('User not found');
            return {
                id: admin.admin_id,
                userType: 'ผู้ดูแลระบบ',
                firstName: admin.admin_fname,
                lastName: admin.admin_lname,
                email: admin.admin_email,
                profileImage: admin.profile_image,
            };
        }
        else if (userType === 'อาจารย์') {
            const lecturer = await this.lecturerRepository.findOneBy({ lecturer_id: id });
            if (!lecturer)
                throw new Error('User not found');
            return {
                id: lecturer.lecturer_id,
                userType: 'อาจารย์',
                firstName: lecturer.lecturer_fname,
                lastName: lecturer.lecturer_lname,
                email: lecturer.lecturer_email,
                profileImage: lecturer.profile_image,
            };
        }
        else if (userType === 'นักศึกษา') {
            const student = await this.studentRepository.findOne({
                where: { student_id: id },
                relations: ['room', 'year'],
            });
            if (!student)
                throw new Error('User not found');
            return {
                id: student.student_id,
                userType: 'นักศึกษา',
                firstName: student.student_fname,
                lastName: student.student_lname,
                email: student.student_email,
                profileImage: student.profile_image,
                room: student.room ? student.room.room_name : null,
                academicYear: student.year ? student.year.year_name : null,
            };
        }
        else {
            throw new Error('Invalid userType');
        }
    }
};
exports.UserManagementService = UserManagementService;
exports.UserManagementService = UserManagementService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tb_admin_entity_1.TbAdmin)),
    __param(1, (0, typeorm_1.InjectRepository)(tb_lecturer_entity_1.TbLecturer)),
    __param(2, (0, typeorm_1.InjectRepository)(tb_student_entity_1.TbStudent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserManagementService);
//# sourceMappingURL=user-management.service.js.map