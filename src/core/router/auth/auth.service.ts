import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreatEntityException } from 'src/core/exceptions/create.entity.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(payload: Object): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): { name: string; email: string; picture: string } {
    return this.jwtService.verify(token);
  }

  async checkEmployee(email: string) {
    return this.usersService
      .findOneByEmail(email)
      .then((user) => {
        if(!user) return false
        else return user.role !== 'anymous'
      });
  }

  async checkUserExist(user: { email: string; name: string; picture: string }) {
    return this.usersService.findByEmail(user.email)
    .then(result => {
      if(!result) return this.usersService
      .create({
        email: user.email,
          name: user.name,
          avatar: user.picture,
          is_active: true,
      })
      else return result
    })
    .then(res => res)
  }
}
