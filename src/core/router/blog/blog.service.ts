import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { viToEn } from 'src/utils/viToEn'
import { Like, Repository, UpdateResult } from 'typeorm'
import { CreateBlogDto, UpdateBlogDto } from './blog.dto'
import { Blog } from './blog.entity'
import { FilterBlog, ParamGetDB } from './interface.blog'
import {UsersService} from '../users/user.service'
import { TagsService } from '../tags/tags.service'

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_REPOSITORY')
    private blogsRepository: Repository<Blog>,
    private usersService: UsersService,
    private tagsService: TagsService
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
  getPageBlog(pageNumber: number, countTake?: number, filter?: FilterBlog) {
    Object.keys(filter).forEach((key) => {
      if(!filter[key]) delete filter[key]
    })
    return this.blogsRepository.findAndCount({
      select: [
        'id',
        'title',
        'email',
        'img',
        'overview',
        'heart',
        'view',
        'tags',
        'updatedAt',
      ],
      where: {
        ...filter,
      },
      skip: pageNumber - 1,
      take: countTake ?? 10,
    })
  }

  async getByIdAndTitle(params: ParamGetDB){
    const id = parseInt(params.title.split('-').pop())
    const blog = await this.blogsRepository.findOne({id})
    const title = viToEn(blog.title)
    const email = blog.email.slice(0, blog.email.indexOf('@'))
    if((title + `-${id}`) === params.title && email === params.auth){ 
      const user = await this.usersService.findOneByEmail(blog.email)
      return {blog, user}
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

  getBlogByTag(tag: string){
    return this.blogsRepository.findAndCount({
      select: [
        'id',
        'title',
        'email',
        'img',
        'overview',
        'heart',
        'view',
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
      ]
    })
  }

}
