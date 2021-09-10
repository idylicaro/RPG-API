import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}
