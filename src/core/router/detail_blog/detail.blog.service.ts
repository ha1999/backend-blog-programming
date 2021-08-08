import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DetailBlog } from "./detail.blog.entity";

@Injectable()

export class DetailBlogService {
    constructor(
        @Inject('DETAIL_BLOG_REPOSITORY')
        private detailBlogsRepository: Repository<DetailBlog>,
    ){}
        async getDetailBlogById(blog_id: number){
            const blogDetail = await this.detailBlogsRepository.findOne({blog_id})
            const heart = blogDetail.heart.split(' ').length
            const book_mark = blogDetail.book_mark.split(' ').length
            return {
                heart,
                book_mark,
                view: blogDetail.view
            }
        }

        async heartToBlog(user_id: string, blog_id: number){
            const blogDetail = await this.detailBlogsRepository.findOne({blog_id})
            const heartBlog = blogDetail.heart
            const checkIsHeart = heartBlog.split(' ').includes(user_id)
            if(checkIsHeart) throw new BadRequestException('You already heart to this blog')
            else return this.detailBlogsRepository.update({blog_id}, {
                heart: `${heartBlog} ${user_id}`.trim()
            })
        }

        async saveToBlog(user_id: string, blog_id: number){
            console.log(user_id, 'user_id')
            const blogDetail = await this.detailBlogsRepository.findOne({blog_id})
            const saveBlog = blogDetail.book_mark
            const checkIsSave = saveBlog.split(' ').includes(user_id)
            if(checkIsSave) throw new BadRequestException('You already save to this blog')
            else return this.detailBlogsRepository.update({blog_id}, {
                book_mark: `${saveBlog} ${user_id}`.trim()
            })
        }


}