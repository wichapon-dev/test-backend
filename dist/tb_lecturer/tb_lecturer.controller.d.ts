import { TbLecturerService } from './tb_lecturer.service';
import { signupDto } from './dto/lecturer-signup.dto';
export declare class TbLecturerController {
    private readonly tbLecturerService;
    constructor(tbLecturerService: TbLecturerService);
    signup(signupDto: signupDto): Promise<import("./entities/tb_lecturer.entity").TbLecturer>;
}
