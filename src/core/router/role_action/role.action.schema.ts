import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleActionDocument = RoleAction & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class RoleAction {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  action_id: number;

  @Prop({ required: false, default: true })
  active: boolean;
}

export const RoleActionSchema = SchemaFactory.createForClass(RoleAction);
