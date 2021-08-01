import { Module } from '@nestjs/common';
import { BlogsController } from './blog.controller';
import { BlogService } from './blog.service';
import { DatabaseModule } from '../type_orm/database.module';
import { blogProviders } from './blog.providers';
import { UserHttpModule } from '../users/users-http.module';
import { TagsHttpModule } from '../tags/tags-http.module';

@Module({
  imports: [DatabaseModule, UserHttpModule, TagsHttpModule],
  providers: [...blogProviders, BlogService],
  controllers: [BlogsController],
})
export class BlogHttpModule {}
