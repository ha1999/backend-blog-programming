import { Inject, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { Blog } from './blog.entity';
import { FilterBlog } from './interface.blog';

@Injectable()
export class BlogService {
  constructor(
    @Inject('BLOG_REPOSITORY')
    private blogsRepository: Repository<Blog>,
  ) {}
  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = new Blog();
    Object.assign(blog, createBlogDto);
    return this.blogsRepository.save(blog);
  }

  inActive(id: number): Promise<UpdateResult> {
    return this.blogsRepository.update({ id }, { active: false });
  }

  delete(id: number) {
    return this.blogsRepository.delete({ id });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogsRepository.update({ id }, { ...updateBlogDto });
  }

  // get all blog by page
  getPageBlog(pageNumber: number, countTake?: number, filter?: FilterBlog) {
    Object.keys(filter).forEach((key) => {
      if (filter[key] === null || filter[key] === undefined) delete filter[key];
    });
    return this.blogsRepository.findAndCount({
      select: [
        'id',
        'title',
        'email',
        'img',
        'overview',
        'rate',
        'view',
        'tags',
        'updatedAt',
      ],
      where: {
        ...filter,
      },
      skip: pageNumber - 1,
      take: countTake ?? 10,
    });
  }
}
