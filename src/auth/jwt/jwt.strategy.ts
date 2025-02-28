// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test123456', // เปลี่ยนเป็น secret ที่ใช้งานจริง
    });
  }

  async validate(payload: JwtPayload) {
    // คืนข้อมูลแบบ unified
    return {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      role: payload.role,
      userType: payload.userType,
      room: payload.room,
      year: payload.year,
      image: payload.image,
    };
  }
}
