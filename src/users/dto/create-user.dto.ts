import { User } from '../entities/user.entity';
import { IsString } from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}
