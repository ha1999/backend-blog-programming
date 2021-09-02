import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Query,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoleActionService } from './role.action.service';
import { CreateRoleActionDto } from './role.action.dto';
import { Response } from 'express';
import { FilterRoleAction } from './interface.role.action';
import { ObjectId } from 'mongoose';
import { ActionGuard } from '../../guards/actions.guard';
import { RequestCustom } from 'src/core/type.request.user';
import { handlerError } from 'src/utils/handError';
@Controller('role-actions')
export class RoleActionsController {
  constructor(private readonly roleActionsService: RoleActionService) {}

  @Post()
  async create(
    @Body() createRoleActionDto: CreateRoleActionDto[],
    @Res({passthrough: true}) res: Response,
  ) {
    try {
      const data = await this.roleActionsService.bulkCreate(createRoleActionDto)
      return data
    } catch (error) {
      handlerError(error)
    }
  }

  @Get(':pageNumber')
  @UseGuards(ActionGuard)
  async filterByPage(
    @Param('pageNumber') pageNumber: number,
    @Query() query: FilterRoleAction,
    @Res({passthrough: true}) res: Response,
    @Req() req: RequestCustom,
  ) {
    const { limit, ...filter } = query;
    try {
      const data = await this.roleActionsService
      .getPageRoleAction(filter, limit, pageNumber)
      return data
    } catch (error) {
      handlerError(error)
    }
  }

  @Put('active/:objectId')
  async activeRoleAction(
    @Param('objectId') _id: ObjectId, 
    @Res({passthrough: true}) res: Response
    ) {
      try {
        const data = await  this.roleActionsService
        .updateActiveById(_id, true)
        return data
      } catch (error) {
        handlerError(error)
      }
  }

  @Put('in-active/:objectId')
  async inActiveRoleAction(
    @Param('objectId') _id: ObjectId, 
    @Res({passthrough: true}) res: Response
  ) {
    try {
      const data = await this.roleActionsService
      .updateActiveById(_id, false)
      return data
    } catch (error) {
      handlerError(error)
    }
  }
}
