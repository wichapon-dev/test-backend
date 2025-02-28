"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTbCommentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tb_comment_dto_1 = require("./create-tb_comment.dto");
class UpdateTbCommentDto extends (0, mapped_types_1.PartialType)(create_tb_comment_dto_1.CreateTbCommentDto) {
}
exports.UpdateTbCommentDto = UpdateTbCommentDto;
//# sourceMappingURL=update-tb_comment.dto.js.map