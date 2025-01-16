import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterRequestDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(userData: UserEntity) {
    const payload = {
      userId: userData.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  profile(userId: number) {
    return this.usersService.findById(userId);
  }

  register(userData: RegisterRequestDto) {
    return this.usersService.createUser(userData);
  }
}
