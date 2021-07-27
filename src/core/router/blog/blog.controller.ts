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
import { QueryBlog } from './interface.blog';
import { FileInterceptor } from '@nestjs/platform-express';
import FireBaseClass from '../../../utils/fireBase';
import { RequestCustom } from 'src/core/type.request.user';
@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogService: BlogService) {}

  @Get(':pageNumber')
  async getAllByPage(
    @Query() query: QueryBlog,
    @Param('pageNumber') pageNumber: number,
    @Res() res: Response,
  ) {
    try {
      const { tags, email } = query;
      const listBlog = await this.blogService.getPageBlog(
        pageNumber,
        query.take,
        { tags, email },
      );
      res.json({ listBlog });
    } catch (error) {
      console.log('error filter blog', error.message);
      res.status(400).json({ error });
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
      console.log('FIle up load is', file)
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
}
