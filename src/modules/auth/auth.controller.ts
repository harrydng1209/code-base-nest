import { AUTH } from '@/constants/route-apis.const';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@/guards/local-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { ProfileResponseDto } from './dtos/profile.dto';
import { RegisterRequestDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post(AUTH.LOGIN)
  @UseGuards(LocalAuthGuard)
  login(@Request() request: { user: UserEntity }) {
    const data = this.authService.login(request.user);
    return { data };
  }

  @Get(AUTH.PROFILE)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async profile(@Request() request: { userId: number }) {
    const user = await this.authService.profile(request.userId);
    const data = new ProfileResponseDto(user);
    return { data };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(AUTH.REGISTER)
  register(@Body() userData: RegisterRequestDto) {
    return this.authService.register(userData);
  }
}
