import { BaseEntity } from 'src/utils/base.entity'
import { Entity, Column, OneToMany} from 'typeorm'
import { Blog } from '../blog/blog.entity'
@Entity('users')
export class User extends BaseEntity {
  @Column()
  email: string

  @Column()
  passwd: string

  @Column()
  salt: string

  @Column({ nullable: true, default: '' })
  name: string

  @Column({ nullable: true, default: '' })
  avatar: string

  @Column({ nullable: true, default: 'anymous'})
  role: string

  @Column({ nullable: true, default: true })
  is_active: boolean

  @OneToMany(() => Blog, blog => blog.user)
    blogs: Blog[];
}