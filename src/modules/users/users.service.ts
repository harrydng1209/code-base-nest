import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userData: Partial<UserEntity>) {
    const user = this.userRepository.create(userData);
    const hashedPassword = await hash(userData.password, 10);

    user.password = hashedPassword;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  findById(userId: number) {
    const user = this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const isValid = await compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}
