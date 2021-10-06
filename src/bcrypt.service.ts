import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 12;

@Injectable()
export class BcryptService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storedPasswordHash);
  }
}
