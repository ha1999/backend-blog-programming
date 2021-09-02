import {
  Controller,
  Get,
  Param,
  Res,
  Query,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { CreateActionDto, UpdateActionDto } from './action.dto'
import { ActionsService } from './action.service'
import { Action } from '../../decorators/action.decorator'
import { ActionGuard } from 'src/core/guards/actions.guard'
import { handlerError } from 'src/utils/handError'
@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionsService) {}

  @Get(':pageNumber')
  @Action('GET_ALL_ACTION')
  @UseGuards(ActionGuard)
  async getPageActions(
    @Param('pageNumber') page: number,
    @Query('limit') limit: number,
    @Res({passthrough: true}) res: Response
  ) {
    try {
      const data = await this.actionService.getPageAction(page, limit)
      return data
    } catch (error) {
      handlerError(error)
    }
  }

  @Post('bulk')
  async bulkCreateAction(@Body() actions: CreateActionDto[], @Res({passthrough: true}) res: Response) {
    try {
      const data = await this.actionService.bulkCreateActions(actions)
      return data
    } catch (error) {
      handlerError(error)
    }
  }

  @Post()
  async createAction(@Body() action: CreateActionDto, @Res({passthrough: true}) res: Response) {
    try {
      const data = await this.actionService.createAction(action)
      return data
    } catch (error) {
      handlerError(error)
    }
  }

  @Put(':id')
  async updateAction(@Body() action: UpdateActionDto, @Res({passthrough: true}) res: Response) {
    try {
      const data = await this.actionService.updateAction(action)
      return data
    } catch (error) {
      handlerError(error)
    }
  }

  @Delete(':id')
  async deleteAction(@Param('id') id: number, @Res({passthrough: true}) res: Response) {
    try {
      const data = await this.actionService.deleteAction(id)
      return data
    } catch (error) {
      handlerError(error)
    }
  }

  @Put('active/:id')
  async updateActiveAction(
    @Param('id') id: number,
    @Body() active: { active: boolean },
    @Res({passthrough: true}) res: Response,
  ) {
    try {
      const data = await this.actionService.updateActive(id, active.active)
      return data
    } catch (error) {
      handlerError(error)
    }
  }
}
