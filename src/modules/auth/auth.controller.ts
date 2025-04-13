import { AUTH } from '@/constants/route-apis.const';
import { COOKIE_KEYS, ERROR_CODES } from '@/constants/shared.const';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { BaseHttpException } from '@/exceptions/base-http.exception';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@/guards/local-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { ProfileResponseDto } from './dtos/profile.dto';
import { RegisterRequestDto } from './dtos/register.dto';

interface IRequestWithCookies {
  cookies?: {
    [key: string]: string;
  };
}

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post(AUTH.LOGIN)
  @UseGuards(LocalAuthGuard)
  login(
    @Req() request: { user: UserEntity },
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = this.authService.login(request.user, response);
    return { data };
  }

  @ApiBearerAuth()
  @Get(AUTH.PROFILE)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async profile(@CurrentUser() userParam: UserEntity) {
    const user = await this.authService.profile(userParam.id);
    const data = new ProfileResponseDto(user);
    return { data };
  }

  @HttpCode(HttpStatus.OK)
  @Post(AUTH.REFRESH_TOKEN)
  async refresh(@Req() request: Request) {
    const refreshToken = (request as unknown as IRequestWithCookies).cookies?.[
      COOKIE_KEYS.REFRESH_TOKEN
    ];

    if (!refreshToken) {
      const throwError = {
        code: ERROR_CODES.ERR_001,
        data: null,
        message: 'Refresh token not found',
      };
      throw new BaseHttpException(throwError, HttpStatus.UNAUTHORIZED);
    }

    const data = await this.authService.refreshToken(refreshToken);
    return { data };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(AUTH.REGISTER)
  register(@Body() payload: RegisterRequestDto) {
    return this.authService.register(payload);
  }
}
