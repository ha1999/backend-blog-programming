import { Module } from '@nestjs/common'
import { DatabaseModule } from '../type_orm/database.module';
import { BlogDetailController } from './detail.blog.controller';
import { detailBlogProviders } from './detail.blog.provider';
import { DetailBlogService } from './detail.blog.service';

@Module({
    imports: [DatabaseModule],
    providers: [...detailBlogProviders, DetailBlogService],
    controllers: [BlogDetailController],
    exports: [DetailBlogService]
})

export class DetailBlogHttpModule{}