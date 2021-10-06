import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string;
  username: string;
  email: string;
  password: string;
  emailConfirmed?: boolean;
}
