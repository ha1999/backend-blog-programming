import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { handlerError } from 'src/utils/handError';
import { RequestCustom } from 'src/core/type.request.user';
import { UnauthorizedException } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getAllUser(@Res() res: Response) {
    try {
      const data = await this.userService.findAll();
      res.json({ data: data });
    } catch (error) {
      handlerError(error)
    }
  }

  @Get('profile')
  async profileUser(
    @Req() req: RequestCustom
  ) {
    try {
      const data = await this.userService.findOne(req.user.id.toString());
      return data
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    try {
      const data = await this.userService.findOne(id);
      return data
    } catch (error) {
      handlerError(error)
    }
  }
  @Post()
  async createUser(@Body() userCreate: CreateUserDto) {
    try {
      const result = await this.userService.create(userCreate);
      return result
    } catch (error) {
      handlerError(error)
    }
  }
  @Put()
  async updateUser(@Body() userUpdate: UpdateUserDto) {
    try {
      const result = await this.userService.updateOne(userUpdate);
      return result
    } catch (error) {
      handlerError(error)
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const result = await this.userService.remove(id);
      return result
    } catch (error) {
      handlerError(error)
    }
  }
}
