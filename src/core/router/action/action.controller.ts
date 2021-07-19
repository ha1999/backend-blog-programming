import {Controller, Get, Param, Res, Query, Post, Body, Put, Delete} from '@nestjs/common'
import { Response } from 'express';
import { CreateActionDto, UpdateActionDto } from './action.dto';
import { ActionsService } from './action.service';
import {Action} from '../../decorators/action.decorator'
@Controller('actions')

export class ActionController {
    constructor(private readonly actionService: ActionsService){}

    @Get(':pageNumber')
    @Action('GET_ALL_ACTION')
    getPageActions(@Param('pageNumber') page: number, @Query('limit') limit: number , @Res() res: Response){
        this.actionService
        .getPageAction(page, limit)
        .then(actions => res.json({actions}))
        .catch(error => res.status(400).json({error}))
    }

    @Post('bulk')
    bulkCreateAction(@Body() actions: CreateActionDto[], @Res() res: Response){
        this.actionService
        .bulkCreateActions(actions)
        .then(actions => res.json({actions}))
        .catch(error => res.status(400).json({error}))
    }

    @Post()
    createAction(@Body() action: CreateActionDto, @Res() res: Response){
        this.actionService
        .createAction(action)
        .then(action => res.json({action}))
        .catch(error => res.status(400).json({error}))
    }

    @Put(':id')
    updateAction(@Body() action: UpdateActionDto, @Res() res: Response){
        this.actionService
        .updateAction(action)
        .then(action => res.json({action}))
        .catch(error => res.status(400).json({error}))
    }

    @Delete(':id')
    deleteAction(@Param('id') id: number, @Res() res: Response){
        this.actionService
        .deleteAction(id)
        .then(action => res.json({action}))
        .catch(error => res.status(400).json({error}))
    }

    @Put('active/:id')
    updateActiveAction(@Param('id') id: number, @Body() active: {active: boolean}, @Res() res: Response){
        this.actionService
        .updateActive(id, active.active)
        .then(action => res.json({action}))
        .catch(error => res.status(400).json({error}))
    }

}