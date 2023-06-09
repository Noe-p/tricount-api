import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantsService } from 'src/participants/participants.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity/user.entity';

// Cette classe est un service qui va nous permettre de manipuler les données de la table users
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private participantService: ParticipantsService,
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

  async updateUser(id: string, user: User) {
    this.usersRepository.update(id, user);
  }

  async deleteUser(user_id: string) {
    await this.participantService.removeAllParticipantsByUser(user_id);
    await this.usersRepository.delete(user_id);
  }
}
