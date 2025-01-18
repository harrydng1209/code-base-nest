import constants from '@/constants';
import { BaseHttpException } from '@/exceptions/base-http.exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

const { ERR_001 } = constants.shared.ERROR_CODES;
const { CONFLICT, NOT_FOUND } = HttpStatus;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: Partial<UserEntity>) {
    const { email, password, username } = userData;

    const errors: { fields: string[] } = { fields: [] };

    const existingEmail = await this.findByEmail(email);
    if (existingEmail) errors.fields.push('email');

    const existingUsername = await this.findByUsername(username);
    if (existingUsername) errors.fields.push('username');

    if (errors.fields.length > 0) {
      const throwError = {
        code: ERR_001,
        data: errors,
        message: 'Fields already exist',
      };
      throw new BaseHttpException(throwError, CONFLICT);
    }

    const user = this.userRepository.create(userData);
    const hashedPassword = await hash(password, 10);

    user.password = hashedPassword;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findById(id: number) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) {
      const throwError = {
        code: ERR_001,
        data: null,
        message: 'Account does not exist',
      };
      throw new BaseHttpException(throwError, NOT_FOUND);
    }
    return user;
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValid = await compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}
