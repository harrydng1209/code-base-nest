import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  displayName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}
