"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbAdminModule = void 0;
const common_1 = require("@nestjs/common");
const tb_admin_service_1 = require("./tb_admin.service");
const tb_admin_controller_1 = require("./tb_admin.controller");
const tb_admin_entity_1 = require("./entities/tb_admin.entity");
const typeorm_1 = require("@nestjs/typeorm");
let TbAdminModule = class TbAdminModule {
};
exports.TbAdminModule = TbAdminModule;
exports.TbAdminModule = TbAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tb_admin_entity_1.TbAdmin])],
        controllers: [tb_admin_controller_1.TbAdminController],
        providers: [tb_admin_service_1.TbAdminService],
        exports: [typeorm_1.TypeOrmModule, tb_admin_service_1.TbAdminService],
    })
], TbAdminModule);
//# sourceMappingURL=tb_admin.module.js.map