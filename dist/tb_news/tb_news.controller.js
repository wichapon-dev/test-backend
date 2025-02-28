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
exports.TbNewsController = void 0;
const common_1 = require("@nestjs/common");
const tb_news_service_1 = require("./tb_news.service");
const create_tb_new_dto_1 = require("./dto/create-tb_new.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const local_auth_guard_1 = require("../auth/local-auth.guard");
const update_tb_new_dto_1 = require("./dto/update-tb_new.dto");
let TbNewsController = class TbNewsController {
    constructor(tbNewsService) {
        this.tbNewsService = tbNewsService;
    }
    async findAdminNews() {
        return await this.tbNewsService.findAdminNews();
    }
    async findNewNews() {
        return await this.tbNewsService.findNewNews();
    }
    async findNewsImportant() {
        return await this.tbNewsService.findImportant();
    }
    async findNewsActivity() {
        return await this.tbNewsService.findNewsActivity();
    }
    async findNewsScholarShip() {
        return await this.tbNewsService.findNewsScholarShip();
    }
    async findNewNewsLogin(req) {
        const user = req.user;
        if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
            return await this.tbNewsService.findGlobalAndMyNews(user);
        }
        else {
            const studentRoom = req.user?.room;
            const studentYear = req.user?.year;
            return await this.tbNewsService.findNewNewsAll(studentRoom, studentYear);
        }
    }
    async findNewsImportantRoom(req) {
        const user = req.user;
        if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
            return await this.tbNewsService.findImportantGlobalAndMyNews(user);
        }
        else {
            const studentRoom = req.user?.room;
            const studentYear = req.user?.year;
            return await this.tbNewsService.findNewsImportantRoomAll(studentRoom, studentYear);
        }
    }
    async findNewsInClassAll(req) {
        const studentRoom = req.user?.room;
        const studentYear = req.user?.year;
        console.log(studentYear);
        return await this.tbNewsService.findNewsInClassAll(studentRoom, studentYear);
    }
    async findNewsActivityAll(req) {
        const user = req.user;
        if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
            return await this.tbNewsService.findActivityGlobalAndMyNews(user);
        }
        else {
            const studentRoom = req.user?.room;
            const studentYear = req.user?.year;
            return await this.tbNewsService.findNewsActivityAll(studentRoom, studentYear);
        }
    }
    async findNewsScholarShipAll(req) {
        const user = req.user;
        if (user.userType === 'ผู้ดูแลระบบ' || user.userType === 'อาจารย์') {
            return await this.tbNewsService.findScholarshipGlobalAndMyNews(user);
        }
        else {
            const studentRoom = req.user?.room;
            const studentYear = req.user?.year;
            return await this.tbNewsService.findNewsScholarShipAll(studentRoom, studentYear);
        }
    }
    async findMyNews(req) {
        const user = req.user;
        return await this.tbNewsService.findMyNews(user);
    }
    async searchNews(query) {
        return this.tbNewsService.searchNews(query);
    }
    async findNewsByUser(userType, userId, viewerRoom, viewerYear) {
        return await this.tbNewsService.findNewsByUser(userType, userId, viewerRoom, viewerYear);
    }
    async findNewsDetail(newId) {
        return await this.tbNewsService.findNewsById(newId);
    }
    async getFile(filename, res) {
        const filePath = `./uploads/${filename}`;
        return res.sendFile(filePath, { root: '.' });
    }
    async create(createTbNewDto, req) {
        const user = req.user;
        if (user.userType !== 'ผู้ดูแลระบบ' && user.userType !== 'อาจารย์') {
            throw new common_1.ForbiddenException('เฉพาะ ผู้ดูแลระบบ และ อาจาร์ย เท่านั้นที่สามารถแจ้งข่าวได้');
        }
        return this.tbNewsService.create(createTbNewDto, user);
    }
    async adminUpdateNews(newId, updateDto, req) {
        const user = req.user;
        if (user.userType !== 'ผู้ดูแลระบบ') {
            throw new common_1.ForbiddenException('เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถแก้ไขข่าวได้');
        }
        return await this.tbNewsService.adminUpdateNews(newId, updateDto);
    }
    async updateNews(newId, updateDto, req) {
        const user = req.user;
        if (user.userType !== 'ผู้ดูแลระบบ' && user.userType !== 'อาจารย์') {
            throw new common_1.ForbiddenException('เฉพาะ ผู้ดูแลระบบ และ อาจารย์ เท่านั้นที่สามารถแก้ไขข่าวได้');
        }
        const news = await this.tbNewsService.findNewsById(newId);
        if (!news) {
            throw new common_1.NotFoundException('ไม่พบข่าวที่ต้องการแก้ไข');
        }
        if (user.userType === 'ผู้ดูแลระบบ' && news.admins?.admin_id !== user.id) {
            throw new common_1.ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
        }
        else if (user.userType === 'อาจารย์' &&
            news.lecturers?.lecturer_id !== user.id) {
            throw new common_1.ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
        }
        return await this.tbNewsService.updateNews(newId, updateDto);
    }
    async adminDeleteNews(newId, req) {
        const user = req.user;
        if (user.userType !== 'ผู้ดูแลระบบ') {
            throw new common_1.ForbiddenException('เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถลบข่าวได้');
        }
        return await this.tbNewsService.adminDeleteNews(newId);
    }
    async deleteNews(newId, req) {
        const user = req.user;
        if (user.userType !== 'ผู้ดูแลระบบ' && user.userType !== 'อาจารย์') {
            throw new common_1.ForbiddenException('เฉพาะ ผู้ดูแลระบบ และ อาจารย์ เท่านั้นที่สามารถลบข่าวได้');
        }
        const news = await this.tbNewsService.findNewsById(newId);
        if (!news) {
            throw new common_1.NotFoundException('ไม่พบข่าวที่ต้องการลบ');
        }
        if (user.userType === 'ผู้ดูแลระบบ' && news.admins?.admin_id !== user.id) {
            throw new common_1.ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
        }
        else if (user.userType === 'อาจารย์' &&
            news.lecturers?.lecturer_id !== user.id) {
            throw new common_1.ForbiddenException('คุณไม่ใช่เจ้าของข่าวนี้');
        }
        return await this.tbNewsService.deleteNews(newId);
    }
    async uploadCoverImage(newId, file) {
        const filePath = `/uploads/coverimage/${file.filename}`;
        await this.tbNewsService.uploadCoverImage(newId, filePath);
        return { message: 'Cover image uploaded successfully' };
    }
};
exports.TbNewsController = TbNewsController;
__decorate([
    (0, common_1.Get)('admin-news'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findAdminNews", null);
__decorate([
    (0, common_1.Get)('new-news'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewNews", null);
__decorate([
    (0, common_1.Get)('important'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsImportant", null);
__decorate([
    (0, common_1.Get)('activity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsActivity", null);
__decorate([
    (0, common_1.Get)('scholarship'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsScholarShip", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Get)('new-news-room'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewNewsLogin", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Get)('important-room'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsImportantRoom", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Get)('inclass'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsInClassAll", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Get)('activity/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsActivityAll", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Get)('scholarship/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsScholarShipAll", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Get)('my-news'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findMyNews", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "searchNews", null);
__decorate([
    (0, common_1.Get)('user/:userType/:userId'),
    __param(0, (0, common_1.Param)('userType')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Query)('room')),
    __param(3, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, String]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsByUser", null);
__decorate([
    (0, common_1.Get)(':newId'),
    __param(0, (0, common_1.Param)('newId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "findNewsDetail", null);
__decorate([
    (0, common_1.Get)('file/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "getFile", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tb_new_dto_1.CreateTbNewDto, Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Patch)('admin/:newId'),
    __param(0, (0, common_1.Param)('newId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tb_new_dto_1.UpdateTbNewDto, Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "adminUpdateNews", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Patch)(':newId'),
    __param(0, (0, common_1.Param)('newId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tb_new_dto_1.UpdateTbNewDto, Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "updateNews", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Delete)('admin/:newId'),
    __param(0, (0, common_1.Param)('newId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "adminDeleteNews", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Delete)(':newId'),
    __param(0, (0, common_1.Param)('newId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "deleteNews", null);
__decorate([
    (0, common_1.Post)(':newId/upload-cover-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/coverimage',
            filename: (req, file, callback) => {
                const fileExtName = (0, path_1.extname)(file.originalname);
                const fileName = `${Date.now()}${fileExtName}`;
                callback(null, fileName);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('newId')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TbNewsController.prototype, "uploadCoverImage", null);
exports.TbNewsController = TbNewsController = __decorate([
    (0, common_1.Controller)('tb-news'),
    __metadata("design:paramtypes", [tb_news_service_1.TbNewsService])
], TbNewsController);
//# sourceMappingURL=tb_news.controller.js.map