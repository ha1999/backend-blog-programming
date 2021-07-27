import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagsDocument = Tags & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Tags {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, default: [] })
  listIdBlog: number[];
}

export const TagsSchema = SchemaFactory.createForClass(Tags);
