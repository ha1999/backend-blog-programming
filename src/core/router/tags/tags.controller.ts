import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { Cron } from '@nestjs/schedule'
import { Tag } from './tags.dto'
import { TagsService } from './tags.service'
import { handlerError } from 'src/utils/handError'

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
            handlerError(err)
        })
    }

    @Get(':tag')
    getAllIdBlogOfTag(@Param('tag') tag: string) {
        try {
            return this.tagsService.getIdBlogByTag(tag)
        } catch (error) {
            handlerError(error)
        }
        
    }

    @Post()
    createTag(@Body() tag: Tag) {
        try {
            return this.tagsService.createTag(tag)
        } catch (error) {
            handlerError(error)
        }
        
    }

    @Post(':id')
    createTagOfBlog(@Param('id') id: number, @Body() tags: string[]) {
        try {
            return this.tagsService.bulkAddIdBlogToTag(id, tags)
        } catch (error) {
            handlerError(error)
        }
        
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