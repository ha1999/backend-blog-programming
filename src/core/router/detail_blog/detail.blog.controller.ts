import { Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { DetailBlogService } from "./detail.blog.service";
import {Response} from 'express'
import { RequestCustom } from "src/core/type.request.user";


@Controller('blog-detail-info')

export class BlogDetailController{
    constructor(
        private readonly blogDetailService: DetailBlogService
    ){}

    @Get(':blogId')
    async getByBlogId(@Param('blogId') blog_id: number, @Res({passthrough: true}) res: Response){
        try {
            const data = await this.blogDetailService.getDetailBlogById(blog_id)
            return data
        } catch (error){
            res.status(500).json(error)
        }
    }

    @Post('heart/:blogId')
    async heartToBlog(@Param('blogId') blog_id: number, @Res({passthrough: true}) res: Response, @Req() req: RequestCustom){
        try {
            const user_id = req.user.id.toString()
            const data = await this.blogDetailService.heartToBlog(user_id, blog_id)
            return data
        } catch (error) {
            res.status(500).json(error)
        }
    }

    @Post('save/:blogId')
    async userSaveBlog(@Param('blogId') blog_id: number, @Res({passthrough: true}) res: Response, @Req() req: RequestCustom){
        try {
            const user_id = req.user.id.toString()
            const data = await this.blogDetailService.saveToBlog(user_id, blog_id)
            return data
        } catch (error) {
            res.status(500).json(error)
        }
    }

}