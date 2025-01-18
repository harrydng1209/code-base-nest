import constants from '@/constants';
import { BaseHttpException } from '@/exceptions/base-http.exception';
import { UsersService } from '@/modules/users/users.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

const { ERR_001 } = constants.shared.ERROR_CODES;
const { BAD_REQUEST } = HttpStatus;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      passwordField: 'password',
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      const throwError = {
        code: ERR_001,
        data: null,
        message: 'Invalid email or password',
      };
      throw new BaseHttpException(throwError, BAD_REQUEST);
    }
    return user;
  }
}
