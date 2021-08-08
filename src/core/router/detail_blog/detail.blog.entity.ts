import { BaseEntity } from 'src/utils/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('detail_blogs')
export class DetailBlog extends BaseEntity {
  @Column({unique: true})
  blog_id: number;

  @Column({nullable: true, default: ''})
  heart: string;

  @Column({ nullable: true, default: '' })
  book_mark: string;

  @Column({ nullable: true, default: 0 })
  view: number;
}
