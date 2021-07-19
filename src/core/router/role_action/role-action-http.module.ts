import { Global, Module } from '@nestjs/common';
import { RoleActionsController } from './role.action.controller';
import { RoleActionService } from './role.action.service';
import { DatabaseModule } from '../mongodb/database.module';
import { roleActionProviders } from './role.action.providers';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [...roleActionProviders, RoleActionService],
  controllers: [RoleActionsController],
  exports: [RoleActionService],
})
export class RoleActionHttpModule {}
