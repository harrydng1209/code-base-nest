import { ERROR_CODES } from '@/constants/shared.const';
import { BaseHttpException } from '@/exceptions/base-http.exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterRequestDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  login(userParam: UserEntity) {
    const jwtData = {
      userId: userParam.id,
    };
    const refreshToken = this.jwtService.sign(jwtData, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '10d',
    });

    return {
      accessToken: this.jwtService.sign(jwtData),
      refreshToken,
    };
  }

  profile(userIdParam: number) {
    return this.usersService.findById(userIdParam);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findById(payload.userId);

      if (!user) {
        const throwError = {
          code: ERROR_CODES.ERR_001,
          data: null,
          message: 'User not found',
        };
        throw new BaseHttpException(throwError, HttpStatus.UNAUTHORIZED);
      }

      const jwtData = {
        userId: user.id,
      };
      const newAccessToken = this.jwtService.sign(jwtData);

      return { accessToken: newAccessToken };
    } catch (error) {
      console.error(error);
      const throwError = {
        code: ERROR_CODES.ERR_001,
        data: null,
        message: 'Invalid refresh token',
      };
      throw new BaseHttpException(throwError, HttpStatus.UNAUTHORIZED);
    }
  }

  register(userParam: RegisterRequestDto) {
    return this.usersService.createUser(userParam);
  }
}
