import { BaseEntity } from 'src/utils/base.entity';
import { Entity, Column, Index } from 'typeorm';

@Entity('blogs')
export class Blog extends BaseEntity {
  @Column()
  email: string;

  @Column({
    unique: true,
  })
  title: string;

  @Index('search-full-tex', { fulltext: true })
  @Column({default: ''})
  search: string

  @Column()
  img: string;

  @Column()
  overview: string;

  @Column()
  content: string;

  @Column()
  tags: string;

  @Column({ nullable: true, default: true })
  active: boolean;
}
