import { Connection } from 'mongoose';
import { Tags, TagsSchema } from './tags.schema';

export const tagsProviders = [
  {
    provide: 'TAGS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model(Tags.name, TagsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
