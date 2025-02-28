export interface JwtPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: number | string;
  userType: 'ผู้ดูแลระบบ' | 'อาจารย์' | 'นักศึกษา';
  room?: string; // เฉพาะ student
  year?: string; // เฉพาะ student
  image?: string; // รูปโปรไฟล์ (ถ้ามี)
}