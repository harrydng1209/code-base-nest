import constants from '@/constants';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';

import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { ProfileResponseDto } from './dtos/profile.dto';
import { RegisterRequestDto } from './dtos/register.dto';

const { AUTH } = constants.routeApis;
const { CREATED, OK } = constants.shared.HTTP_CODES;

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(OK)
  @Post(AUTH.LOGIN)
  @UseGuards(LocalAuthGuard)
  login(@Request() request: { user: UserEntity }) {
    const data = this.authService.login(request.user);
    return { data };
  }

  @Get(AUTH.PROFILE)
  @HttpCode(OK)
  @UseGuards(JwtAuthGuard)
  async profile(@Request() request: { userId: number }) {
    const user = await this.authService.profile(request.userId);
    const data = new ProfileResponseDto(user);
    return { data };
  }

  @HttpCode(CREATED)
  @Post(AUTH.REGISTER)
  register(@Body() userData: RegisterRequestDto) {
    const data = this.authService.register(userData);
    return { data };
  }
}
