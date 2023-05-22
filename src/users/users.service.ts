import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUser(_id: string): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['lastName', 'firstName', 'email', 'id'],
      where: [{ id: _id }],
    });
  }

  async createUser(user: User) {
    const id = uuidv4();

    this.usersRepository.save({ ...user, id: id });
  }

  async updateUser(id: number, user: User) {
    this.usersRepository.update(id, user);
  }

  async deleteUser(user: User) {
    this.usersRepository.delete(user);
  }
}
