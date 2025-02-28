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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbFiles = void 0;
const typeorm_1 = require("typeorm");
const tb_new_entity_1 = require("../../tb_news/entities/tb_new.entity");
let TbFiles = class TbFiles {
};
exports.TbFiles = TbFiles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], TbFiles.prototype, "file_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TbFiles.prototype, "file_path", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tb_new_entity_1.TbNew, news => news.files),
    __metadata("design:type", tb_new_entity_1.TbNew)
], TbFiles.prototype, "news", void 0);
exports.TbFiles = TbFiles = __decorate([
    (0, typeorm_1.Entity)()
], TbFiles);
//# sourceMappingURL=tb_file.entity.js.map