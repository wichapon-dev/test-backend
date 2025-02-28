"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbYearModule = void 0;
const common_1 = require("@nestjs/common");
const tb_year_service_1 = require("./tb_year.service");
const tb_year_controller_1 = require("./tb_year.controller");
let TbYearModule = class TbYearModule {
};
exports.TbYearModule = TbYearModule;
exports.TbYearModule = TbYearModule = __decorate([
    (0, common_1.Module)({
        controllers: [tb_year_controller_1.TbYearController],
        providers: [tb_year_service_1.TbYearService],
    })
], TbYearModule);
//# sourceMappingURL=tb_year.module.js.map