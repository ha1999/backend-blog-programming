import { Inject, Injectable } from '@nestjs/common'
import { User } from './core/router/users/user.entity'
import { UserResponse } from './core/router/users/user.response'
import { UsersService } from './core/router/users/user.service'
import uploadFile from './utils/fireBase'
@Injectable()
export class AppService {
  constructor(
    @Inject('UsersService')
    private readonly usersService: UsersService
  ){}
  async getHello(){
    try {
      return 'url.url'
    } catch (error) {
      console.log(error, 'day la loi')
    }
    
  }
  getUser(): Promise<UserResponse[]> {
    return this.usersService.findAll()
  }
}
