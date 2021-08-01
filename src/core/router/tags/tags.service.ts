import { Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Tag } from './tags.dto';
import { TagsDocument } from './tags.schema';
import sendMailService from '../../../utils/sendMail'
@Injectable()
export class TagsService {
  constructor(
    @Inject('TAGS_MODEL')
    private readonly tagsModel: Model<TagsDocument>
  ) {}
  getAllTags(){
      return this.tagsModel.find({})
      .exec()
  }
  createTag(tag: Tag){
     return new this.tagsModel(tag).save()
  }

  getIdBlogByTag(tag: string){
      return this.tagsModel
      .find({name: tag})
      .select({name: 1, listIdBlog: 1, _id: 0})
      .exec()
  }

  bulkCreateTags(tags: Tag[]) {
      return this.tagsModel.insertMany(tags)
  }


  async bulkAddIdBlogToTag(id: number, tags: string[]) {
    const session = await this.tagsModel.db.startSession();
    try {
      session.startTransaction();
      const result = await this.tagsModel.updateMany(
          {name: {$in: tags}},
           {$push: {'listIdBlog': id} },
           { "new": true, "upsert": true }).exec()
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      console.log(' Error bulk create tags of blog', error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  demoSendMail(emails: string[]) {
    return sendMailService(emails)
  }

}