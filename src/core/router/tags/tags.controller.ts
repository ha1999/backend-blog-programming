import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { Cron } from '@nestjs/schedule'
import { Tag } from './tags.dto'
import { TagsService } from './tags.service'

@Controller('tags')

export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Get('all')
    async getAllTags(@Res({passthrough: true}) res: Response) {
        return this.tagsService.getAllTags()
        .then(data => {
            res.status(200)
            return data.map(tag => tag.name)
        })
        .catch(err => {
            res.status(500)
            return err
        })
    }

    @Get(':tag')
    getAllIdBlogOfTag(@Param('tag') tag: string) {
        return this.tagsService.getIdBlogByTag(tag)
    }

    @Post()
    createTag(@Body() tag: Tag) {
        return this.tagsService.createTag(tag)
    }

    @Post(':id')
    createTagOfBlog(@Param('id') id: number, @Body() tags: string[]) {
        return this.tagsService.bulkAddIdBlogToTag(id, tags)
    }

    // @Cron('45 * * * * *')
    // createFakeTags() {
    //     this.tagsService.bulkCreateTags([
    //         {
    //             name: 'react',
    //             listIdBlog: []
    //         },
    //         {
    //             name: 'vue',
    //             listIdBlog: []
    //         },
    //         {
    //             name: 'js',
    //             listIdBlog: []
    //         },
    //         {
    //             name: 'nodejs',
    //             listIdBlog: []
    //         },
    //         {
    //             name: 'git',
    //             listIdBlog: []
    //         },
    //         {
    //             name: 'nestjs',
    //             listIdBlog: []
    //         },

    //     ])
    //     .then(res => console.log('ok', res))
    //     .catch(err => console.error(err))
    // }

    // @Cron('45 * * * * *')
    // sendMail(){
    //     this.tagsService.demoSendMail(['leha220699@gmail.com'])
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err))
    // }

}