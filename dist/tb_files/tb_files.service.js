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
exports.TbFilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tb_file_entity_1 = require("./entities/tb_file.entity");
let TbFilesService = class TbFilesService {
    constructor(tbUserfilesRepository) {
        this.tbUserfilesRepository = tbUserfilesRepository;
    }
    async uploadFile(newId, filePath) {
        const newUserFile = this.tbUserfilesRepository.create({
            news: { new_id: newId },
            file_path: filePath,
        });
        return this.tbUserfilesRepository.save(newUserFile);
    }
    async findFile(fileId) {
        return this.tbUserfilesRepository.findOne({ where: { file_id: fileId } });
    }
    async deleteFile(fileId) {
        await this.tbUserfilesRepository.delete(fileId);
    }
};
exports.TbFilesService = TbFilesService;
exports.TbFilesService = TbFilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tb_file_entity_1.TbFiles)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TbFilesService);
//# sourceMappingURL=tb_files.service.js.map