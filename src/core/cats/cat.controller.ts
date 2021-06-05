
import { Controller, Get, Post, Delete, Put, Req, Res, Next, Param, Redirect } from '@nestjs/common';
import {Request, Response, NextFunction} from 'express'
@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request, @Res() res: Response) {
    res.json(`This action returns all cats ${request}`);
  }
  @Get(':id')
  findById(@Param('id') id: string, @Res() res: Response) {
      res.json({data:`Find by id id ${id}`})
  }
  @Post()
  createCat(): string {
      return 'create cats'
  }
  @Put(':id')
  UpdateById(): string {
      return 'Update by id'
  }
  @Delete(':id')
  deleteCat(): string {
      return 'Delete cats'
  }
}
