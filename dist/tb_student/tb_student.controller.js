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
exports.TbStudentController = void 0;
const common_1 = require("@nestjs/common");
const tb_student_service_1 = require("./tb_student.service");
const student_signup_dto_1 = require("./dto/student-signup.dto");
let TbStudentController = class TbStudentController {
    constructor(tbStudentService) {
        this.tbStudentService = tbStudentService;
    }
    async signup(signupDto) {
        return this.tbStudentService.create(signupDto);
    }
};
exports.TbStudentController = TbStudentController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_signup_dto_1.signupDto]),
    __metadata("design:returntype", Promise)
], TbStudentController.prototype, "signup", null);
exports.TbStudentController = TbStudentController = __decorate([
    (0, common_1.Controller)('tb-student'),
    __metadata("design:paramtypes", [tb_student_service_1.TbStudentService])
], TbStudentController);
//# sourceMappingURL=tb_student.controller.js.map