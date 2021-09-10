import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/shared/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersServices: UsersService,
              private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersServices.findByUsername(username);
    if (user && user.password === password) {
      const { id, username } = user;
      return { id, username };
    }
    return null;
  }

  async login(user: any){
    const payload = {username: user.username, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload)
    }    
  }
}
