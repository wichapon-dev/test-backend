import { JwtPayload } from './jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: string | number;
        userType: "ผู้ดูแลระบบ" | "อาจารย์" | "นักศึกษา";
        room: string;
        year: string;
        image: string;
    }>;
}
export {};
