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
exports.TbCommentsController = void 0;
const common_1 = require("@nestjs/common");
const tb_comments_service_1 = require("./tb_comments.service");
const create_tb_comment_dto_1 = require("./dto/create-tb_comment.dto");
const passport_1 = require("@nestjs/passport");
let TbCommentsController = class TbCommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async findCommentsByNews(newsId) {
        return this.commentsService.findNews(newsId);
    }
    async createComment(createCommentDto, req) {
        const user = req.user;
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return this.commentsService.create(createCommentDto, user);
    }
};
exports.TbCommentsController = TbCommentsController;
__decorate([
    (0, common_1.Get)('news/:newsId'),
    __param(0, (0, common_1.Param)('newsId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TbCommentsController.prototype, "findCommentsByNews", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tb_comment_dto_1.CreateTbCommentDto, Object]),
    __metadata("design:returntype", Promise)
], TbCommentsController.prototype, "createComment", null);
exports.TbCommentsController = TbCommentsController = __decorate([
    (0, common_1.Controller)('tb-comments'),
    __metadata("design:paramtypes", [tb_comments_service_1.TbCommentsService])
], TbCommentsController);
//# sourceMappingURL=tb_comments.controller.js.map