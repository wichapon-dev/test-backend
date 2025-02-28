import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('User in AdminGuard:', user); // เพิ่ม log เพื่อตรวจสอบ
    // ตรวจสอบว่า user มี userType เป็น admin
    return user && user.userType === 'ผู้ดูแลระบบ';
  }
}
