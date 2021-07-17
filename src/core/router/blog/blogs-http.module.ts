import { Module } from '@nestjs/common'
import { BlogModule } from './blog.module'
import {BlogsController} from './blog.controller'
import {BlogService} from './blog.service'

@Module({
    imports: [BlogModule],
    providers: [BlogService],
    controllers: [BlogsController],
  })
  export class BlogHttpModule {}