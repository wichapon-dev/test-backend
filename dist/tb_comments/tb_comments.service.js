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
exports.TbCommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tb_comment_entity_1 = require("./entities/tb_comment.entity");
const tb_new_entity_1 = require("../tb_news/entities/tb_new.entity");
const tb_student_entity_1 = require("../tb_student/entities/tb_student.entity");
const tb_lecturer_entity_1 = require("../tb_lecturer/entities/tb_lecturer.entity");
const tb_admin_entity_1 = require("../tb_admin/entities/tb_admin.entity");
let TbCommentsService = class TbCommentsService {
    constructor(commentsRepository, studentRepository, lecturerRepository, adminRepository, newsRepository) {
        this.commentsRepository = commentsRepository;
        this.studentRepository = studentRepository;
        this.lecturerRepository = lecturerRepository;
        this.adminRepository = adminRepository;
        this.newsRepository = newsRepository;
    }
    async findNews(newsId) {
        return this.commentsRepository.find({
            where: { news: { new_id: newsId } },
            relations: ['students', 'lecturers', 'admins'],
        });
    }
    async create(createCommentDto, user) {
        const { comments_detail, newsId } = createCommentDto;
        const news = await this.newsRepository.findOne({ where: { new_id: newsId } });
        if (!news) {
            throw new common_1.NotFoundException('ข่าวไม่พบ');
        }
        const comment = new tb_comment_entity_1.TbComments();
        comment.comments_detail = comments_detail;
        comment.news = news;
        if (user.userType === 'นักศึกษา') {
            const student = await this.studentRepository.findOne({ where: { student_id: user.id } });
            if (!student) {
                throw new common_1.NotFoundException('ไม่พบข้อมูลนักศึกษา');
            }
            comment.students = student;
        }
        else if (user.userType === 'อาจารย์') {
            const lecturer = await this.lecturerRepository.findOne({ where: { lecturer_id: user.id } });
            if (!lecturer) {
                throw new common_1.NotFoundException('ไม่พบข้อมูลอาจารย์');
            }
            comment.lecturers = lecturer;
        }
        else if (user.userType === 'ผู้ดูแลระบบ') {
            const admin = await this.adminRepository.findOne({ where: { admin_id: user.id } });
            if (!admin) {
                throw new common_1.NotFoundException('ไม่พบข้อมูลผู้ดูแลระบบ');
            }
            comment.admins = admin;
        }
        else {
            throw new common_1.BadRequestException('ประเภทผู้ใช้งานไม่ถูกต้อง');
        }
        return this.commentsRepository.save(comment);
    }
};
exports.TbCommentsService = TbCommentsService;
exports.TbCommentsService = TbCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tb_comment_entity_1.TbComments)),
    __param(1, (0, typeorm_1.InjectRepository)(tb_student_entity_1.TbStudent)),
    __param(2, (0, typeorm_1.InjectRepository)(tb_lecturer_entity_1.TbLecturer)),
    __param(3, (0, typeorm_1.InjectRepository)(tb_admin_entity_1.TbAdmin)),
    __param(4, (0, typeorm_1.InjectRepository)(tb_new_entity_1.TbNew)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TbCommentsService);
//# sourceMappingURL=tb_comments.service.js.map