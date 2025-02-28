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
exports.TbFilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const tb_files_service_1 = require("./tb_files.service");
const multer_1 = require("multer");
const path_1 = require("path");
const promises_1 = require("fs/promises");
let TbFilesController = class TbFilesController {
    constructor(tbFilesService) {
        this.tbFilesService = tbFilesService;
    }
    async uploadFiles(newId, files) {
        const fileUploadPromises = files.map(file => {
            const filePath = `/uploads/files/${file.filename}`;
            return this.tbFilesService.uploadFile(newId, filePath);
        });
        await Promise.all(fileUploadPromises);
        return { message: 'Files uploaded successfully' };
    }
    async deleteFile(fileId) {
        const file = await this.tbFilesService.findFile(fileId);
        if (!file) {
            throw new common_1.HttpException('File not found', common_1.HttpStatus.NOT_FOUND);
        }
        const absolutePath = (0, path_1.join)(process.cwd(), file.file_path.startsWith('/') ? file.file_path.substring(1) : file.file_path);
        try {
            await (0, promises_1.unlink)(absolutePath);
        }
        catch (error) {
            console.error('Error deleting file from disk:', error);
        }
        await this.tbFilesService.deleteFile(fileId);
        return { message: 'File deleted successfully' };
    }
};
exports.TbFilesController = TbFilesController;
__decorate([
    (0, common_1.Post)(':newId/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/files',
            filename: (req, file, callback) => {
                const fileExtName = (0, path_1.extname)(file.originalname);
                const fileName = `${Date.now()}${fileExtName}`;
                callback(null, fileName);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('newId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], TbFilesController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Delete)(':fileId'),
    __param(0, (0, common_1.Param)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TbFilesController.prototype, "deleteFile", null);
exports.TbFilesController = TbFilesController = __decorate([
    (0, common_1.Controller)('tb-files'),
    __metadata("design:paramtypes", [tb_files_service_1.TbFilesService])
], TbFilesController);
//# sourceMappingURL=tb_files.controller.js.map