import {Controller, Get, Post, Put, Delete, Res,Body,HttpException, Param, Req} from '@nestjs/common'
import {Response, Request} from 'express'
import {UsersService} from './user.service'
import {CreateUserDto, UpdateUserDto} from './user.dto'

@Controller('users')

export class UserController {
    constructor(private readonly userService: UsersService){}
    @Get()
    async getAllUser(@Res() res: Response){
        try {
            const data = await this.userService.findAll()
            res.json({data: data})
        } catch (error) {
            throw new HttpException(error.message, 500)
        }
    }
    @Get(':id')
    async getById(@Param('id') id: string, @Res() res: Response, @Req() req: Request){
        try {
            console.log('cookie is', req.cookies['token'])
            const data = await this.userService.findOne(id)
            res.json({data: data})
        } catch (error) {
            throw new HttpException(error.message, 500)
        }
    }
    @Post()
    async createUser(@Body() userCreate: CreateUserDto, @Res() res: Response){
        try {
            const result = await this.userService.create(userCreate)
            res.json({data: result})
        } catch (error) {
            throw new HttpException(error.message, 500)
        }
    }
    @Put()
    async updateUser(@Body() userUpdate: UpdateUserDto, @Res() res: Response){
        const result = await this.userService.updateOne(userUpdate)
        res.json({data: result})
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Res() res: Response){
        const result = await this.userService.remove(id)
        res.json({data: result})
    }

}