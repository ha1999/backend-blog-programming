
import { UnauthorizedException } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {AuthService} from '../router/auth/auth.service'
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService){}
  use(req: Request, res: Response, next: NextFunction) {
    const {token} = req.cookies
    if(!token) throw new UnauthorizedException("Unauthorized! Because you not logged in")
    try {
      const verify = this.authService.verifyToken(token)
      req.headers.authorization = verify.role
      next();
    } catch (error) {
      throw new UnauthorizedException(`Unauthorized! Because token is ${error.message}`)
    }
  }
}
