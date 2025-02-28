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
exports.UserActivityController = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../auth/admin.guard");
const user_activity_service_1 = require("./user-activity.service");
const local_auth_guard_1 = require("../auth/local-auth.guard");
let UserActivityController = class UserActivityController {
    constructor(userActivityService) {
        this.userActivityService = userActivityService;
    }
    async getLatestUsers() {
        return await this.userActivityService.getLatestUsers();
    }
    async heartbeat(req) {
        await this.userActivityService.updateHeartbeat(req.user);
        return { message: 'Heartbeat updated' };
    }
    async getRoleUsageStatistics() {
        return await this.userActivityService.getRoleUsageStatistics();
    }
};
exports.UserActivityController = UserActivityController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserActivityController.prototype, "getLatestUsers", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('heartbeat'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserActivityController.prototype, "heartbeat", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard, admin_guard_1.AdminGuard),
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserActivityController.prototype, "getRoleUsageStatistics", null);
exports.UserActivityController = UserActivityController = __decorate([
    (0, common_1.Controller)('user-activity'),
    __metadata("design:paramtypes", [user_activity_service_1.UserActivityService])
], UserActivityController);
//# sourceMappingURL=user-activity.controller.js.map