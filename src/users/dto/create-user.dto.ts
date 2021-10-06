import { User } from '../entities/user.entity';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsEmail()
  readonly email: string;
}
