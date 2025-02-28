"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbRoleModule = void 0;
const common_1 = require("@nestjs/common");
const tb_role_service_1 = require("./tb_role.service");
const tb_role_controller_1 = require("./tb_role.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tb_role_entity_1 = require("./entities/tb_role.entity");
let TbRoleModule = class TbRoleModule {
};
exports.TbRoleModule = TbRoleModule;
exports.TbRoleModule = TbRoleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tb_role_entity_1.TbRole])],
        controllers: [tb_role_controller_1.TbRoleController],
        providers: [tb_role_service_1.TbRoleService],
    })
], TbRoleModule);
//# sourceMappingURL=tb_role.module.js.map