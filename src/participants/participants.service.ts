import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Participant } from './participant.entity/participant.entity';

// Cette classe est un service qui va nous permettre de faire le lien entre les users et les expenses
@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private participantsRepository: Repository<Participant>,
  ) {}

  async getParticipants(): Promise<Participant[]> {
    return await this.participantsRepository.find();
  }

  async getParticipant(_id: string): Promise<Participant[]> {
    return await this.participantsRepository.find({
      select: ['id', 'id_user', 'id_expense'],
      where: [{ id: _id }],
    });
  }

  async createParticipant(participant: string, id_expense: string) {
    const id = uuidv4();
    await this.participantsRepository.save({
      id: id,
      id_user: participant,
      id_expense: id_expense,
    });
  }

  async updateParticipant(id: number, participant: Participant) {
    this.participantsRepository.update(id, participant);
  }

  async deleteParticipant(participant: Participant) {
    this.participantsRepository.delete(participant);
  }

  async getExpenseOfUser(id_user: string) {
    const result = await this.participantsRepository
      .createQueryBuilder('participant')
      .select('participant.id_expense', 'id_expense')
      .where('participant.id_user = :id', { id: id_user })
      .getRawMany();
    return result.map((item) => item.id_expense);
  }

  async getUserOfExpense(id_expense: string): Promise<string[]> {
    const result = await this.participantsRepository
      .createQueryBuilder('participant')
      .select('participant.id_user', 'id_user')
      .where('participant.id_expense = :id', { id: id_expense })
      .getRawMany();
    return result.map((item) => item.id_user);
  }

  async removeAllParticipantsByExpense(id_expense: string) {
    const arrayOfIds = await this.participantsRepository
      .createQueryBuilder('participant')
      .select('participant.id', 'id')
      .where('participant.id_expense = :id', { id: id_expense })
      .getRawMany();
    Promise.all(
      arrayOfIds.map((item) => {
        this.deleteParticipant(item);
      }),
    );
  }

  async removeAllParticipantsByUser(id_user: string) {
    const arrayOfIds = await this.participantsRepository
      .createQueryBuilder('participant')
      .select('participant.id', 'id')
      .where('participant.id_user = :id', { id: id_user })
      .getRawMany();
    Promise.all(
      arrayOfIds.map((item) => {
        this.deleteParticipant(item);
      }),
    );
  }
}
