import { TbAdminService } from './tb_admin.service';
import { signupDto } from './dto/admin-signup.dto';
export declare class TbAdminController {
    private readonly tbAdminService;
    constructor(tbAdminService: TbAdminService);
    signup(signupDto: signupDto): Promise<import("./entities/tb_admin.entity").TbAdmin>;
}
