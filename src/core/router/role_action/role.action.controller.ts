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
@Controller('role-actions')
export class RoleActionsController {
  constructor(private readonly roleActionsService: RoleActionService) {}

  @Post()
  create(
    @Body() createRoleActionDto: CreateRoleActionDto[],
    @Res() res: Response,
  ) {
    this.roleActionsService
      .bulkCreate(createRoleActionDto)
      .then((roleActions) => res.json({ roleActions }))
      .catch((error) => res.status(400).json({ error }));
  }

  @Get(':pageNumber')
  @UseGuards(ActionGuard)
  filterByPage(
    @Param('pageNumber') pageNumber: number,
    @Query() query: FilterRoleAction,
    @Res() res: Response,
    @Req() req: RequestCustom,
  ) {
    const { limit, ...filter } = query;
    this.roleActionsService
      .getPageRoleAction(filter, limit, pageNumber)
      .then((roleActions) => res.json({ roleActions }))
      .catch((error) => res.status(400).json({ error }));
  }

  @Put('active/:objectId')
  activeRoleAction(@Param('objectId') _id: ObjectId, @Res() res: Response) {
    this.roleActionsService
      .updateActiveById(_id, true)
      .then((roleAction) => res.json({ roleAction }))
      .catch((error) => res.status(400).json({ error }));
  }

  @Put('in-active/:objectId')
  inActiveRoleAction(@Param('objectId') _id: ObjectId, @Res() res: Response) {
    this.roleActionsService
      .updateActiveById(_id, false)
      .then((roleAction) => res.json({ roleAction }))
      .catch((error) => res.status(400).json({ error }));
  }
}
