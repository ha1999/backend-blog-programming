import { Module } from '@nestjs/common';
import { ActionController } from './action.controller';
import { ActionsService } from './action.service';
import { actionProviders } from './action.providers';
import { DatabaseModule } from '../type_orm/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...actionProviders, ActionsService],
  controllers: [ActionController],
})
export class ActionHttpModule {}
