import { Connection } from 'typeorm';
import { DetailBlog } from './detail.blog.entity';

export const detailBlogProviders = [
  {
    provide: 'DETAIL_BLOG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(DetailBlog),
    inject: ['DATABASE_CONNECTION'],
  },
];
