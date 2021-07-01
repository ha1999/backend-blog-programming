import { forwardRef, Inject, Injectable } from "@nestjs/common"
import { User } from "../users/user.entity"
import { UsersService } from "../users/user.service"
import {pbkdf2Sync, timingSafeEqual}from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { AuthData } from "./auth.dto"

@Injectable()

export class AuthService{
    constructor(
      @Inject(forwardRef(() => UsersService))
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
      ){}
    
    async validateUser({email, passwd}: AuthData): Promise<Omit<User, 'passwd' | 'salt'> | null> {
        const user = await this.usersService.findByEmail(email)
        const validPasswd = await this.checkPasswd(passwd, user.salt, user.passwd)
        if (user && validPasswd) {
          const { passwd, salt, ...result } = user
          return result
        }
        return null
      }

    async checkPasswd(passwd: string, salt: string, passwdHash: string) {
      const encryptHash = pbkdf2Sync(passwd, salt, 10000, 512, 'sha512')
      return timingSafeEqual(Buffer.from(passwdHash, 'base64'), encryptHash)
    }

    generateToken(payload: Object): string {
      return this.jwtService.sign(payload)
    }

    verifyToken(token: string): Object {
      return this.jwtService.verify(token)
    }
    

}