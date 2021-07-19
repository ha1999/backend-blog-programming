import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { BlogService } from './blog.service';
import { Response } from 'express';
import { QueryBlog } from './interface.blog';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogService) {}

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
  async createBlog(@Body() blogCreate: CreateBlogDto, @Res() res: Response) {
    try {
      const blog = await this.blogService.create(blogCreate);
      res.json({ blog });
    } catch (error) {
      console.log('error create blog', error.message);
      res.status(400).json({ error });
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
