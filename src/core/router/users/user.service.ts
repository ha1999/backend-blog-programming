
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository} from 'typeorm'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.entity'
import { hashPasswd } from 'src/utils/hashData'
import { AuthService } from '../auth/auth.service'
import { UserResponse } from './user.response'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User()
    const {salt, hash}= await hashPasswd(createUserDto.passwd)
    Object.assign(user, {...createUserDto, passwd: hash, salt})
    return this.usersRepository.save(user)
  }
  findAll(): Promise<UserResponse[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'name', 'avatar', 'is_active'],
      relations: ['blogs']
    })
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({email})
  }

  async updateOne(user: UpdateUserDto): Promise<User> {
    const userUpdated = await this.usersRepository.findOne(user.id)
    const userNew = Object.assign({},userUpdated, user)
    return this.usersRepository.save(userNew)
  }

  remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id)
  }
}
