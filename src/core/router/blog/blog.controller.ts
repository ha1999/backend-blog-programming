import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Res,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CreateBlogDtoBody, UpdateBlogDto } from './blog.dto';
import { BlogService } from './blog.service';
import { Response } from 'express';
import { ParamGetDB, QueryBlog } from './interface.blog';
import { FileInterceptor } from '@nestjs/platform-express';
import FireBaseClass from '../../../utils/fireBase';
import { RequestCustom } from 'src/core/type.request.user';
import { viToEn } from 'src/utils/viToEn';
// import { params } from 'config/configuration';
// import { Cron } from '@nestjs/schedule';
@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogService) {}

  @Get(':pageNumber')
  async getAllByPage(
    @Query() query: QueryBlog,
    @Param('pageNumber') pageNumber: number,
    @Res({passthrough: true}) res: Response,
  ) {
    try {
      const { tags, email, take } = query;
      const [listData, count] = await this.blogService.getPageBlog(
        pageNumber,
        take,
        { tags, email },
      )
      const listBlog = listData.map(blog => ({
        ...blog,
        email: blog.email.slice(0, blog.email.indexOf('@')),
        updatedAt: blog.updatedAt.toString().slice(0, 10),
        url: blog.email.slice(0, blog.email.indexOf('@')) + '/' + viToEn(blog.title) + '-' + blog.id 
      }))
      return {listBlog, count}
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  @Get('blog-detail/:auth/:title')
  async getDetailBlog(@Param() params: ParamGetDB, @Res({passthrough: true}) res: Response){
    try {
      const blog = await this.blogService.getByIdAndTitle(params)
      return blog
    } catch (error) {
      res.status(500).json(error)
    }
  }
  @Get('t/:tag')
  async getByTag(@Param('tag') tag: string, @Res({passthrough: true}) res: Response){
    try {
      const [listBlog, count] = await this.blogService.getBlogByTag(tag)
      return {
        listBlog,
        count
      }
    } catch (error) {
      res.status(500).json({error: error})
    }
  }


  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async createBlog(
      @UploadedFile() file: Express.Multer.File,
      @Body() blogCreate: CreateBlogDtoBody, 
      @Req() req: RequestCustom,
      @Res() res: Response) {
    try {
      const img = await FireBaseClass.uploadFileWithBuffer(file.originalname, file.buffer, file.mimetype)
      const blog = await this.blogService.create({...blogCreate, img, email: req.user.email});
      res.json({ blog });
    } catch (error) {
      console.log('error create blog', error.message, error);
      res.status(500).json({ error });
    }
  }

  @Put(':id')
  async updateBlog(
    @Param('id') id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @Res() res: Response,
  ) {
    try {
      const blog = await this.blogService.update(id, updateBlogDto);
      res.json({ blog });
    } catch (error) {
      console.log('error update blog', error.message);
      res.status(400).json({ error });
    }
  }



  // @Cron('45 * * * * *')
  // async batchAddBlogToTag(){
  //   await this.blogService.addBlogToTag()
  //   console.log('ok')
  // }

}
