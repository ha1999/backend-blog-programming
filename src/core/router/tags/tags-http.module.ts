import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { DatabaseModule } from '../mongodb/database.module';
import { tagsProviders } from './tags.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...tagsProviders, TagsService],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsHttpModule {}
