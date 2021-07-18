import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleAction, RoleActionSchema } from './role.action.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RoleAction.name, schema: RoleActionSchema }])],
  exports: [MongooseModule]
})
export class RoleActionsModule {}