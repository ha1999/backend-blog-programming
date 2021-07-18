import { Module } from '@nestjs/common'
import { RoleActionsModule } from './role.action.module'
import {RoleActionsController} from './role.action.controller'
import {RoleActionService} from './role.action.service'

@Module({
    imports: [RoleActionsModule],
    providers: [RoleActionService],
    controllers: [RoleActionsController]
  })
  export class RoleActionHttpModule {}