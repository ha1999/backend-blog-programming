import { BaseEntity } from 'src/utils/base.entity'
import { Entity, Column, ManyToOne} from 'typeorm'
import { User } from '../users/user.entity'

@Entity('blogs')
export class Blog extends BaseEntity {
  @Column()
  title: string
  @Column()
  content: string

  @Column({ nullable: true, default: 0 })
  view: number

  @Column({ nullable: true, default: '5-0' })
  rate: string
  @ManyToOne(() => User, user => user.blogs)
  user: User;
}