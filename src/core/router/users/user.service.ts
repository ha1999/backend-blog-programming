import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserResponse } from './user.response';
@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    return this.usersRepository.save(user);
  }
  findAll(): Promise<UserResponse[]> {
    return this.usersRepository.find({
      select: ['id', 'email', 'name', 'avatar', 'is_active'],
      relations: ['blogs'],
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async updateOne(user: UpdateUserDto): Promise<User> {
    const userUpdated = await this.usersRepository.findOne(user.id);
    const userNew = Object.assign({}, userUpdated, user);
    return this.usersRepository.save(userNew);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
