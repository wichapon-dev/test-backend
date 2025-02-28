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
exports.TbAdminService = void 0;
const common_1 = require("@nestjs/common");
const tb_admin_entity_1 = require("./entities/tb_admin.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let TbAdminService = class TbAdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async findOne(email) {
        return this.adminRepository.findOne({
            where: { admin_email: email },
            relations: ['role'],
        });
    }
    async create(signupDto) {
        const newAdmin = this.adminRepository.create(signupDto);
        newAdmin.admin_password = await bcrypt.hash(signupDto.admin_password, 10);
        return this.adminRepository.save(newAdmin);
    }
    async updateLastActive(adminId, lastActive) {
        await this.adminRepository.update(adminId, { last_active: lastActive });
    }
};
exports.TbAdminService = TbAdminService;
exports.TbAdminService = TbAdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tb_admin_entity_1.TbAdmin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TbAdminService);
//# sourceMappingURL=tb_admin.service.js.map