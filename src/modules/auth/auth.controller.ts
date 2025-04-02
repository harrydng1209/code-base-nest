import { AUTH } from '@/constants/route-apis.const';
import { CurrentUser } from '@/decorators/current-user.decorator';
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
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { ProfileResponseDto } from './dtos/profile.dto';
import { RefeshTokenRequestDto } from './dtos/refresh-token.dto';
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
  async refresh(@Body() payload: RefeshTokenRequestDto) {
    const data = await this.authService.refreshToken(payload.refreshToken);
    return { data };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(AUTH.REGISTER)
  register(@Body() payload: RegisterRequestDto) {
    return this.authService.register(payload);
  }
}
