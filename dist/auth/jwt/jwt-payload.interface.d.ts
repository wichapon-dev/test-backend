export interface JwtPayload {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: number | string;
    userType: 'ผู้ดูแลระบบ' | 'อาจารย์' | 'นักศึกษา';
    room?: string;
    year?: string;
    image?: string;
}
