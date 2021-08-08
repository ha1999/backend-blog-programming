import { Module } from '@nestjs/common'
import { BlogsController } from './blog.controller'
import { BlogService } from './blog.service'
import { DatabaseModule } from '../type_orm/database.module'
import { blogProviders } from './blog.providers'
import { UserHttpModule } from '../users/users-http.module'
import { TagsHttpModule } from '../tags/tags-http.module'
import { DetailBlogHttpModule } from '../detail_blog/detail.blog-http.module'

@Module({
  imports: [DatabaseModule, UserHttpModule, TagsHttpModule, DetailBlogHttpModule],
  providers: [...blogProviders, BlogService],
  controllers: [BlogsController],
})
export class BlogHttpModule {}
