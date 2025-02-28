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
exports.TbNewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tb_new_entity_1 = require("./entities/tb_new.entity");
const tb_file_entity_1 = require("../tb_files/entities/tb_file.entity");
const tb_student_entity_1 = require("../tb_student/entities/tb_student.entity");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const tb_comment_entity_1 = require("../tb_comments/entities/tb_comment.entity");
let TbNewsService = class TbNewsService {
    constructor(newsRepository, studentRepository, filesRepository, commentsRepository) {
        this.newsRepository = newsRepository;
        this.studentRepository = studentRepository;
        this.filesRepository = filesRepository;
        this.commentsRepository = commentsRepository;
    }
    async find(filter) {
        return this.newsRepository.find({ where: filter });
    }
    async findNewNews() {
        return await this.newsRepository.find({
            where: [
                { room: 'all', year: 'all' },
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findImportant() {
        return await this.newsRepository.find({
            where: { isImportant: true, room: 'all', year: 'all' },
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewsScholarShip() {
        return await this.newsRepository.find({
            where: [
                { category: 'ทุนการศึกษา', room: 'all', year: 'all' },
                { isImportant: true, category: 'scholarship', room: 'all', year: 'all' }
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewsActivity() {
        return await this.newsRepository.find({
            where: [
                { category: 'กิจกรรม', room: 'all', year: 'all' },
                { isImportant: true, category: 'activity', room: 'all', year: 'all' }
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewNewsAll(studentRoom, studentYear) {
        return await this.newsRepository.find({
            where: [
                { room: studentRoom, year: studentYear },
                { room: 'all', year: 'all' },
                { room: studentRoom, year: 'all' },
                { room: 'all', year: studentYear },
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'content', 'title', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewsImportantRoomAll(studentRoom, studentYear) {
        return await this.newsRepository.find({
            where: [
                { isImportant: true, room: studentRoom, year: studentYear },
                { isImportant: true, room: 'all', year: 'all' },
                { isImportant: true, room: studentRoom, year: 'all' },
                { isImportant: true, room: 'all', year: studentYear },
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewsInClassAll(studentRoom, studentYear) {
        return await this.newsRepository.find({
            where: [
                { room: studentRoom, year: studentYear },
                { room: studentRoom, year: 'all' },
                { isImportant: true, room: studentRoom, year: studentYear },
                { isImportant: true, room: studentRoom, year: 'all' },
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewsActivityAll(studentRoom, studentYear) {
        return await this.newsRepository.find({
            where: [
                { category: 'กิจกรรม', room: studentRoom, year: studentYear },
                { category: 'กิจกรรม', room: 'all', year: 'all' },
                { category: 'กิจกรรม', isImportant: true, room: studentRoom, year: studentYear },
                { category: 'กิจกรรม', isImportant: true, room: 'all', year: 'all' },
                { category: 'กิจกรรม', room: studentRoom, year: 'all' },
                { category: 'กิจกรรม', room: 'all', year: studentYear },
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewsScholarShipAll(studentRoom, studentYear) {
        return await this.newsRepository.find({
            where: [
                { category: 'ทุนการศึกษา', room: studentRoom, year: studentYear },
                { category: 'ทุนการศึกษา', room: 'all', year: 'all' },
                { category: 'ทุนการศึกษา', isImportant: true, room: studentRoom, year: studentYear },
                { category: 'ทุนการศึกษา', isImportant: true, room: 'all', year: 'all' },
                { category: 'ทุนการศึกษา', room: studentRoom, year: 'all' },
                { category: 'ทุนการศึกษา', room: 'all', year: studentYear },
            ],
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findGlobalAndMyNews(user) {
        if (user.userType === 'ผู้ดูแลระบบ') {
            return await this.newsRepository.find({
                where: [
                    { room: 'all', year: 'all' },
                    { admins: { admin_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else if (user.userType === 'อาจารย์') {
            return await this.newsRepository.find({
                where: [
                    { room: 'all', year: 'all' },
                    { lecturers: { lecturer_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else {
            throw new common_1.ForbiddenException('Endpoint นี้ใช้ได้เฉพาะสำหรับผู้ดูแลระบบและอาจารย์');
        }
    }
    async findImportantGlobalAndMyNews(user) {
        if (user.userType === 'ผู้ดูแลระบบ') {
            return await this.newsRepository.find({
                where: [
                    { isImportant: true, room: 'all', year: 'all' },
                    { isImportant: true, admins: { admin_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else if (user.userType === 'อาจารย์') {
            return await this.newsRepository.find({
                where: [
                    { isImportant: true, room: 'all', year: 'all' },
                    { isImportant: true, lecturers: { lecturer_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else {
            throw new common_1.ForbiddenException('ผู้ใช้ไม่สามารถเข้าถึง endpoint นี้');
        }
    }
    async findActivityGlobalAndMyNews(user) {
        if (user.userType === 'ผู้ดูแลระบบ') {
            return await this.newsRepository.find({
                where: [
                    { category: 'กิจกรรม', room: 'all', year: 'all' },
                    { category: 'กิจกรรม', admins: { admin_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else if (user.userType === 'อาจารย์') {
            return await this.newsRepository.find({
                where: [
                    { category: 'กิจกรรม', room: 'all', year: 'all' },
                    { category: 'กิจกรรม', lecturers: { lecturer_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else {
            throw new common_1.ForbiddenException('นักศึกษาไม่สามารถเข้าถึงข่าวกิจกรรมแบบนี้ได้');
        }
    }
    async findScholarshipGlobalAndMyNews(user) {
        if (user.userType === 'ผู้ดูแลระบบ') {
            return await this.newsRepository.find({
                where: [
                    { category: 'ทุนการศึกษา', room: 'all', year: 'all' },
                    { category: 'ทุนการศึกษา', admins: { admin_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else if (user.userType === 'อาจารย์') {
            return await this.newsRepository.find({
                where: [
                    { category: 'ทุนการศึกษา', room: 'all', year: 'all' },
                    { category: 'ทุนการศึกษา', lecturers: { lecturer_id: user.id } }
                ],
                relations: ['admins', 'lecturers', 'students', 'comments', 'files'],
                order: { date_last_post: 'DESC' },
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
            });
        }
        else {
            throw new common_1.ForbiddenException('นักศึกษาไม่สามารถเข้าถึง endpoint นี้');
        }
    }
    async findMyNews(user) {
        if (user.userType === 'ผู้ดูแลระบบ') {
            return await this.newsRepository.find({
                where: { admins: { admin_id: user.id } },
                relations: ['admins', 'files'],
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
                order: { date_last_post: 'DESC' },
            });
        }
        else if (user.userType === 'อาจารย์') {
            return await this.newsRepository.find({
                where: { lecturers: { lecturer_id: user.id } },
                relations: ['lecturers', 'files'],
                select: [
                    'new_id',
                    'title',
                    'content',
                    'category',
                    'room',
                    'year',
                    'date_last_post',
                    'coverImage',
                    'isImportant'
                ],
                order: { date_last_post: 'DESC' },
            });
        }
        else {
            throw new common_1.ForbiddenException('นักศึกษาไม่สามารถเข้าถึงข่าวที่สร้างเองได้');
        }
    }
    async searchNews(keyword) {
        return await this.newsRepository.find({
            where: [
                { title: (0, typeorm_2.Like)(`%${keyword}%`) },
                { category: (0, typeorm_2.Like)(`%${keyword}%`) }
            ],
            select: ['new_id', 'title', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async findNewsByUser(userType, userId, viewerRoom, viewerYear) {
        if (userType === 'ผู้ดูแลระบบ') {
            if (viewerRoom && viewerYear) {
                return await this.newsRepository.find({
                    where: [
                        { admins: { admin_id: userId }, room: viewerRoom, year: viewerYear },
                        { admins: { admin_id: userId }, room: 'all', year: 'all' },
                        { admins: { admin_id: userId }, room: viewerRoom, year: 'all' },
                        { admins: { admin_id: userId }, room: 'all', year: viewerYear },
                        { admins: { admin_id: userId }, isImportant: true, room: 'all', year: 'all' },
                        { admins: { admin_id: userId }, isImportant: true, room: viewerRoom, year: 'all' },
                        { admins: { admin_id: userId }, isImportant: true, room: 'all', year: viewerYear },
                    ],
                    relations: ['admins'],
                    order: { date_last_post: 'DESC' },
                    select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post', 'isImportant'],
                });
            }
            else {
                return await this.newsRepository.find({
                    where: { admins: { admin_id: userId } },
                    relations: ['admins'],
                    order: { date_last_post: 'DESC' },
                    select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post', 'isImportant'],
                });
            }
        }
        else if (userType === 'อาจารย์') {
            if (viewerRoom && viewerYear) {
                return await this.newsRepository.find({
                    where: [
                        { lecturers: { lecturer_id: userId }, room: viewerRoom, year: viewerYear },
                        { lecturers: { lecturer_id: userId }, room: 'all', year: 'all' },
                        { lecturers: { lecturer_id: userId }, room: viewerRoom, year: 'all' },
                        { lecturers: { lecturer_id: userId }, room: 'all', year: viewerYear },
                        { lecturers: { lecturer_id: userId }, isImportant: true, room: 'all', year: 'all' },
                        { lecturers: { lecturer_id: userId }, isImportant: true, room: viewerRoom, year: 'all' },
                        { lecturers: { lecturer_id: userId }, isImportant: true, room: 'all', year: viewerYear },
                    ],
                    relations: ['lecturers'],
                    order: { date_last_post: 'DESC' },
                    select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post', 'isImportant'],
                });
            }
            else {
                return await this.newsRepository.find({
                    where: { lecturers: { lecturer_id: userId } },
                    relations: ['lecturers'],
                    order: { date_last_post: 'DESC' },
                    select: ['new_id', 'title', 'category', 'coverImage', 'date_last_post', 'isImportant'],
                });
            }
        }
        else {
            return [];
        }
    }
    async findNewsById(newId) {
        return this.newsRepository.findOne({
            where: { new_id: newId },
            relations: ['comments', 'comments.students', 'files', 'students', 'admins', 'lecturers'],
        });
    }
    async findAdminNews() {
        return await this.newsRepository.find({
            relations: ['comments', 'files', 'students', 'admins', 'lecturers'],
            select: ['new_id', 'title', 'content', 'category', 'room', 'year', 'date_last_post', 'coverImage', 'isImportant'],
            order: { date_last_post: 'DESC' },
        });
    }
    async create(createTbNewDto, user) {
        const news = this.newsRepository.create(createTbNewDto);
        news.date_last_post = new Date();
        if (user.userType === 'ผู้ดูแลระบบ') {
            news.admins = { admin_id: user.id };
        }
        else if (user.userType === 'อาจารย์') {
            news.lecturers = { lecturer_id: user.id };
        }
        const savedNews = await this.newsRepository.save(news);
        return await this.newsRepository.findOne({
            where: { new_id: savedNews.new_id },
            relations: ['admins', 'lecturers'],
        });
    }
    async adminUpdateNews(newId, updateDto) {
        const news = await this.newsRepository.findOne({ where: { new_id: newId } });
        if (!news) {
            throw new Error('News not found');
        }
        if (updateDto.hasOwnProperty('coverImage') && updateDto.coverImage === null && news.coverImage) {
            const filePath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
            const absolutePath = (0, path_1.join)(process.cwd(), filePath);
            try {
                await (0, promises_1.unlink)(absolutePath);
            }
            catch (error) {
                console.error('Error deleting cover image file:', error);
            }
        }
        await this.newsRepository.update(newId, updateDto);
        return await this.newsRepository.findOne({
            where: { new_id: newId },
            relations: ['admins', 'lecturers', 'students'],
        });
    }
    async updateNews(newId, updateDto) {
        const news = await this.newsRepository.findOne({ where: { new_id: newId } });
        if (!news) {
            throw new Error('News not found');
        }
        if (updateDto.hasOwnProperty('coverImage') && updateDto.coverImage === null && news.coverImage) {
            const filePath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
            const absolutePath = (0, path_1.join)(process.cwd(), filePath);
            try {
                await (0, promises_1.unlink)(absolutePath);
            }
            catch (error) {
                console.error('Error deleting cover image file:', error);
            }
        }
        await this.newsRepository.update(newId, updateDto);
        return await this.newsRepository.findOne({
            where: { new_id: newId },
            relations: ['admins', 'lecturers', 'students'],
        });
    }
    async deleteNewsAndAssociations(newId) {
        const news = await this.newsRepository.findOne({
            where: { new_id: newId },
            relations: ['files', 'comments'],
        });
        if (!news) {
            throw new common_1.NotFoundException('ข่าวไม่พบ');
        }
        if (news.coverImage) {
            const filePath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
            const absolutePath = (0, path_1.join)(process.cwd(), filePath);
            try {
                await (0, promises_1.unlink)(absolutePath);
            }
            catch (error) {
                console.error('Error deleting cover image file:', error);
            }
        }
        if (news.files && news.files.length > 0) {
            for (const file of news.files) {
                const filePath = file.file_path.startsWith('/') ? file.file_path.substring(1) : file.file_path;
                const absolutePath = (0, path_1.join)(process.cwd(), filePath);
                try {
                    await (0, promises_1.unlink)(absolutePath);
                }
                catch (error) {
                    console.error('Error deleting file:', error);
                }
                await this.filesRepository.delete(file.file_id);
            }
        }
        if (news.comments && news.comments.length > 0) {
            await this.commentsRepository.delete({ news: { new_id: newId } });
        }
        await this.newsRepository.delete(newId);
    }
    async adminDeleteNews(newId) {
        await this.deleteNewsAndAssociations(newId);
        return { message: 'ข่าวถูกลบเรียบร้อยแล้ว' };
    }
    async deleteNews(newId) {
        await this.deleteNewsAndAssociations(newId);
        return { message: 'ข่าวถูกลบเรียบร้อยแล้ว' };
    }
    async uploadCoverImage(newsId, filePath) {
        const news = await this.newsRepository.findOne({ where: { new_id: newsId } });
        if (!news) {
            throw new Error('News not found');
        }
        if (news.coverImage) {
            const oldPath = news.coverImage.startsWith('/') ? news.coverImage.substring(1) : news.coverImage;
            const absoluteOldPath = (0, path_1.join)(process.cwd(), oldPath);
            try {
                await (0, promises_1.unlink)(absoluteOldPath);
                console.log('Old cover image deleted successfully');
            }
            catch (error) {
                console.error('Error deleting old cover image file:', error);
            }
        }
        news.coverImage = filePath;
        await this.newsRepository.save(news);
    }
};
exports.TbNewsService = TbNewsService;
exports.TbNewsService = TbNewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tb_new_entity_1.TbNew)),
    __param(1, (0, typeorm_1.InjectRepository)(tb_student_entity_1.TbStudent)),
    __param(2, (0, typeorm_1.InjectRepository)(tb_file_entity_1.TbFiles)),
    __param(3, (0, typeorm_1.InjectRepository)(tb_comment_entity_1.TbComments)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TbNewsService);
//# sourceMappingURL=tb_news.service.js.map