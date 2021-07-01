import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

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
}