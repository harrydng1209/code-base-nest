import { IsNotEmpty } from 'class-validator';

export class RefeshTokenRequestDto {
  @IsNotEmpty()
  refreshToken: string;
}
