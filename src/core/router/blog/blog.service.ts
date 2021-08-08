import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { viToEn } from 'src/utils/viToEn'
import { Like, Repository, UpdateResult } from 'typeorm'
import { CreateBlogDto, UpdateBlogDto } from './blog.dto'
import { Blog } from './blog.entity'
import { FilterBlog, ParamGetDB } from './interface.blog'
import {UsersService} from '../users/user.service'
import { TagsService } from '../tags/tags.service'
import { DetailBlogService } from '../detail_blog/detail.blog.service'

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_REPOSITORY')
    private blogsRepository: Repository<Blog>,
    private usersService: UsersService,
    private tagsService: TagsService,
    private detailBlogService: DetailBlogService,
  ) {}
  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = new Blog()
    Object.assign(blog, createBlogDto)
    return this.blogsRepository.save(blog)
  }

  inActive(id: number): Promise<UpdateResult> {
    return this.blogsRepository.update({ id }, { active: false })
  }

  delete(id: number) {
    return this.blogsRepository.delete({ id })
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogsRepository.update({ id }, { ...updateBlogDto })
  }

  // get all blog by page
  async getPageBlog(pageNumber: number, countTake?: number, filter?: FilterBlog) {
    Object.keys(filter).forEach((key) => {
      if(!filter[key]) delete filter[key]
    })
    const [listData, count] = await this.blogsRepository.findAndCount({
      select: [
        'id',
        'title',
        'email',
        'img',
        'overview',
        'tags',
        'updatedAt',
      ],
      where: {
        ...filter,
      },
      skip: pageNumber,
      take: countTake ?? 10,
    })
    const listBlog = listData.map(blog => ({
      ...blog,
      email: blog.email.slice(0, blog.email.indexOf('@')),
      updatedAt: blog.updatedAt.toString().slice(0, 10),
      url: blog.email.slice(0, blog.email.indexOf('@')) + '/' + viToEn(blog.title) + '-' + blog.id
    }))
    return [listBlog, count ]
  }

  async getByIdAndTitle(params: ParamGetDB){
    const id = parseInt(params.title.split('-').pop())
    const blog = await this.blogsRepository.findOne({id})
    const title = viToEn(blog.title)
    const email = blog.email.slice(0, blog.email.indexOf('@'))
    if((title + `-${id}`) === params.title && email === params.auth){ 
      const user = await this.usersService.findOneByEmail(blog.email)
      const detail = await this.detailBlogService.getDetailBlogById(id)
      return {blog, user, detail}
    }
    throw new NotFoundException()
  }

  async addBlogToTag(){
    const idAndTag = await this.blogsRepository.find({
      select: ["id", "tags"]
    })
    const data = idAndTag.map( blog => ({id: blog.id, tags: blog.tags.split(' ')}))
    for( let i=0; i< data.length; i++){
      await this.tagsService.bulkAddIdBlogToTag(data[i].id, data[i].tags)
    }
  }

  async getBlogByTag(tag: string, page: number, take: number){
    const [listData, count] = await this.blogsRepository.findAndCount({
      select: [
        'id',
        'title',
        'email',
        'img',
        'overview',
        'tags',
        'updatedAt',
      ],
      where: [
        {
          tags: Like(`${tag} %`),
          active: true
        },
        {
          tags: Like(`% ${tag}`),
          active: true
        },
        {
          tags: Like(`% ${tag} %`),
          active: true
        },
      ],
      skip: page,
      take
    })
    const listBlog = listData.map(blog => ({
      ...blog,
      email: blog.email.slice(0, blog.email.indexOf('@')),
      updatedAt: blog.updatedAt.toString().slice(0, 10),
      url: blog.email.slice(0, blog.email.indexOf('@')) + '/' + viToEn(blog.title) + '-' + blog.id
    }))
    return [listBlog, count]
  }



  async searchFullTextByTitle(textSearch: string, page: number){
    const text = textSearch.split(' ').join(' | ')
    const [listData, count] = await this.blogsRepository.findAndCount({
      select: [
        'id',
        'title',
        'email',
        'img',
        'overview',
        'tags',
        'updatedAt',
      ],
      where: `search @@ to_tsquery('${text}')`,
      take: 10,
      skip: page
      
    })
    const listBlog = listData.map(blog => ({
      ...blog,
      email: blog.email.slice(0, blog.email.indexOf('@')),
      updatedAt: blog.updatedAt.toString().slice(0, 10),
      url: blog.email.slice(0, blog.email.indexOf('@')) + '/' + viToEn(blog.title) + '-' + blog.id
    }))
    return [listBlog, count]
  }

}
