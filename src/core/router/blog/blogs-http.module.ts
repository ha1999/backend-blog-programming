import { Module } from '@nestjs/common';
import { BlogsController } from './blog.controller';
import { BlogService } from './blog.service';
import { DatabaseModule } from '../type_orm/database.module';
import { blogProviders } from './blog.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...blogProviders, BlogService],
  controllers: [BlogsController],
})
export class BlogHttpModule {}
