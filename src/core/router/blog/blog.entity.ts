import { BaseEntity } from 'src/utils/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('blogs')
export class Blog extends BaseEntity {
  @Column()
  email: string;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  img: string;

  @Column()
  overview: string;

  @Column()
  content: string;

  @Column({ nullable: true, default: 0 })
  view: number;

  @Column({ nullable: true, default: 0 })
  heart: number;

  @Column()
  tags: string;

  @Column({ nullable: true, default: 0 })
  save: number;

  @Column({ nullable: true, default: true })
  active: boolean;
}
