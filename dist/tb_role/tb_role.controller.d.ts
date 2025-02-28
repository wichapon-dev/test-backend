import { TbRoleService } from './tb_role.service';
export declare class TbRoleController {
    private readonly tbRoleService;
    constructor(tbRoleService: TbRoleService);
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
