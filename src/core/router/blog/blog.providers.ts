import { Connection } from 'typeorm';
import { Blog } from './blog.entity';

export const blogProviders = [
  {
    provide: 'BLOG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Blog),
    inject: ['DATABASE_CONNECTION'],
  },
];
