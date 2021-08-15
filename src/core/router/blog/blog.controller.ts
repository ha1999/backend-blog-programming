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
import { handlerError } from 'src/utils/handError';
// import { params } from 'config/configuration';
// import { Cron } from '@nestjs/schedule';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogService) { }

  @Get(':pageNumber')
  async getAllByPage(
    @Query() query: QueryBlog,
    @Param('pageNumber') pageNumber: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { tags, email, take } = query;
      const [listBlog, count] = await this.blogService.getPageBlog(
        pageNumber,
        take,
        { tags, email },
      )
      return { listBlog, count }
    } catch (error) {
      handlerError(error)
    }
  }

  @Get('blog-detail/:auth/:title')
  async getDetailBlog(@Param() params: ParamGetDB, @Res({ passthrough: true }) res: Response) {
    try {
      const blog = await this.blogService.getByIdAndTitle(params)
      return blog
    } catch (error) {
      handlerError(error)
    }
  }
  @Get('t/:tag/:page')
  async getByTag(
    @Query('take') take: number,
    @Param('tag') tag: string,
    @Param('page') page: number,
    @Res({ passthrough: true }) res: Response) {
    try {
      const [listBlog, count] = await this.blogService.getBlogByTag(tag, page, take)
      return {
        listBlog,
        count
      }
    } catch (error) {
      handlerError(error)
    }
  }
  @Get('search/full-text')
  async getBlogBySearch(
    @Query('search') search: string, 
    @Query('page') page: number,
    @Res({passthrough: true}) res: Response){
      try {
        const [listBlog, count] = await this.blogService.searchFullTextByTitle(search, page)
        return {listBlog, count}
      } catch (error) {
        handlerError(error)
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
      const blog = await this.blogService.create({ ...blogCreate, img, email: req.user.email });
      res.json({ blog });
    } catch (error) {
      handlerError(error)
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
      handlerError(error)
    }
  }



  // @Cron('45 * * * * *')
  // async batchAddBlogToTag(){
  //   await this.blogService.addBlogToTag()
  //   console.log('ok')
  // }

}
