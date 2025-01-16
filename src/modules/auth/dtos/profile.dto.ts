import { ERole } from '@/models/enums/auth.enum';
import { UserEntity } from '@/modules/users/entities/user.entity';

export class ProfileResponseDto {
  createdAt: string;
  displayName: string;
  email: string;
  id: number;
  role: ERole;
  updatedAt: string;
  username: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.displayName = user.displayName;
    this.createdAt = user.createdAt.toISOString();
    this.updatedAt = user.updatedAt.toISOString();
    this.role = user.role;
  }
}
