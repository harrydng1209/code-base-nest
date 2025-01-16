import { ERole } from '@/models/enums/auth.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ unique: true })
  email: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column({ default: ERole.User, enum: ERole, type: 'enum' })
  role: ERole;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ unique: true })
  username: string;
}
