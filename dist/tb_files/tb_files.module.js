"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbFilesModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const tb_new_entity_1 = require("../tb_news/entities/tb_new.entity");
const tb_file_entity_1 = require("./entities/tb_file.entity");
const tb_files_service_1 = require("./tb_files.service");
const tb_files_controller_1 = require("./tb_files.controller");
let TbFilesModule = class TbFilesModule {
};
exports.TbFilesModule = TbFilesModule;
exports.TbFilesModule = TbFilesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tb_file_entity_1.TbFiles, tb_new_entity_1.TbNew]),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
        ],
        providers: [tb_files_service_1.TbFilesService],
        controllers: [tb_files_controller_1.TbFilesController],
    })
], TbFilesModule);
//# sourceMappingURL=tb_files.module.js.map