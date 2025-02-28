import { TbCommentsService } from './tb_comments.service';
import { CreateTbCommentDto } from './dto/create-tb_comment.dto';
export declare class TbCommentsController {
    private readonly commentsService;
    constructor(commentsService: TbCommentsService);
    findCommentsByNews(newsId: number): Promise<import("./entities/tb_comment.entity").TbComments[]>;
    createComment(createCommentDto: CreateTbCommentDto, req: any): Promise<import("./entities/tb_comment.entity").TbComments>;
}
