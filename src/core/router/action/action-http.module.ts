import { Module } from '@nestjs/common'
import { ActionModule } from './action.module'
import {ActionController} from './action.controller'
import {ActionsService} from './action.service'

@Module({
    imports: [ActionModule],
    providers: [ActionsService],
    controllers: [ActionController]
  })
  export class ActionHttpModule {}