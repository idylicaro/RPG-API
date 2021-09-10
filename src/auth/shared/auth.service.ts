import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/shared/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersServices: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersServices.findByUsername(username);
    if (user && user.password === password) {
      const { id, username } = user;
      return { id, username };
    }
    return null;
  }
}
