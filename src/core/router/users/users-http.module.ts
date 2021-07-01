import { forwardRef, Module } from '@nestjs/common'
import { UserModule } from './user.module'
import {UserController} from './user.controller'
import {UsersService} from './user.service'
import { AuthModule } from '../auth/auth.module'

@Module({
    imports: [UserModule, forwardRef(() => AuthModule)],
    providers: [UsersService],
    controllers: [UserController],
    exports: [UsersService]
  })
  export class UserHttpModule {}