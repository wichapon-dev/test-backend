"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const tb_role_module_1 = require("./tb_role/tb_role.module");
const tb_news_module_1 = require("./tb_news/tb_news.module");
const tb_comments_module_1 = require("./tb_comments/tb_comments.module");
const tb_files_module_1 = require("./tb_files/tb_files.module");
const tb_file_entity_1 = require("./tb_files/entities/tb_file.entity");
const tb_comment_entity_1 = require("./tb_comments/entities/tb_comment.entity");
const tb_role_entity_1 = require("./tb_role/entities/tb_role.entity");
const tb_new_entity_1 = require("./tb_news/entities/tb_new.entity");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const tb_room_module_1 = require("./tb_room/tb_room.module");
const tb_year_module_1 = require("./tb_year/tb_year.module");
const tb_year_entity_1 = require("./tb_year/entities/tb_year.entity");
const tb_room_entity_1 = require("./tb_room/entities/tb_room.entity");
const tb_admin_module_1 = require("./tb_admin/tb_admin.module");
const tb_lecturer_module_1 = require("./tb_lecturer/tb_lecturer.module");
const tb_admin_entity_1 = require("./tb_admin/entities/tb_admin.entity");
const tb_lecturer_entity_1 = require("./tb_lecturer/entities/tb_lecturer.entity");
const tb_student_module_1 = require("./tb_student/tb_student.module");
const tb_student_entity_1 = require("./tb_student/entities/tb_student.entity");
const user_activity_module_1 = require("./user-activity/user-activity.module");
const user_management_module_1 = require("./user-management/user-management.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DATABASE_HOST,
                port: +Number(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATANAME,
                entities: [tb_new_entity_1.TbNew, tb_role_entity_1.TbRole, tb_year_entity_1.TbYear, tb_room_entity_1.TbRoom, tb_comment_entity_1.TbComments, tb_file_entity_1.TbFiles, tb_admin_entity_1.TbAdmin, tb_lecturer_entity_1.TbLecturer, tb_student_entity_1.TbStudent],
                synchronize: true,
            }),
            auth_module_1.AuthModule,
            tb_role_module_1.TbRoleModule,
            tb_news_module_1.TbNewsModule,
            tb_comments_module_1.TbCommentsModule,
            tb_files_module_1.TbFilesModule,
            tb_room_module_1.TbRoomModule,
            tb_year_module_1.TbYearModule,
            tb_admin_module_1.TbAdminModule,
            tb_lecturer_module_1.TbLecturerModule, tb_student_module_1.TbStudentModule, user_activity_module_1.UserActivityModule, user_management_module_1.UserManagementModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map