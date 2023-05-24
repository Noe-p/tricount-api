import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParticipantsService } from 'src/participants/participants.service';
import { User } from 'src/users/user.entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from './../users/users.service';
import { Expense } from './expense.entity/expense.entity';

export interface ExpenseDto extends Expense {
  participants: string[];
}

export interface ExpenseApi extends Expense {
  participants: User[];
}
@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expensesRepository: Repository<Expense>,
    private participantService: ParticipantsService,
    private usersService: UsersService,
  ) {}

  async getExpenses(): Promise<ExpenseApi[]> {
    const expenses = (await this.expensesRepository.find()).sort(
      (a, b) => b.date.getTime() - a.date.getTime(),
    );

    return await Promise.all(
      expenses.map(async (expense) => {
        const participants = await this.participantService.getUserOfExpense(
          expense.id,
        );
        return {
          ...expense,
          participants: await Promise.all(
            participants.map(async (participant) => {
              const user = await this.usersService.getUser(participant);
              return user[0];
            }),
          ),
        };
      }),
    );
  }

  async getExpense(_id: string): Promise<ExpenseApi> {
    const expense = await this.expensesRepository.find({
      select: ['label', 'amount', 'id_user', 'id_category', 'id', 'date'],
      where: [{ id: _id }],
    });

    return {
      ...expense[0],
      participants: await Promise.all(
        (
          await this.participantService.getUserOfExpense(expense[0].id)
        ).map(async (participant) => {
          const user = await this.usersService.getUser(participant);
          return user[0];
        }),
      ),
    };
  }

  async createExpense(expense: ExpenseDto) {
    const id = uuidv4();

    await this.expensesRepository.save({
      label: expense.label,
      amount: expense.amount,
      id_user: expense.id_user,
      id_category: expense.id_category,
      date: expense.date,
      id: id,
    });

    expense.participants.forEach(async (participant) => {
      await this.participantService.createParticipant(participant, id);
    });
  }

  async updateExpense(id: string, expense: ExpenseDto) {
    await this.expensesRepository.update(id, {
      label: expense.label,
      amount: expense.amount,
      id_user: expense.id_user,
      id_category: expense.id_category,
      date: expense.date,
    });

    await this.participantService.removeAllParticipantsByExpense(id);

    expense.participants.forEach(async (participant) => {
      await this.participantService.createParticipant(participant, id);
    });
  }

  async deleteExpense(expense_id: string) {
    await this.participantService.removeAllParticipantsByExpense(expense_id);
    await this.expensesRepository.delete(expense_id);
  }

  async getTotalAmount() {
    return await this.expensesRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .getRawOne();
  }

  async getUserAmount(id_user: string): Promise<number> {
    const expenses = await this.participantService.getExpenseOfUser(id_user);
    const total = await Promise.all(
      expenses.map(async (expense) => {
        const exp = await this.getExpense(expense);
        return Number(exp.amount) / exp.participants.length;
      }),
    );
    return total.reduce((a, b) => a + b, 0);
  }

  async getUsersAmount(): Promise<{ user: User; balance: number }[]> {
    const users = await this.usersService.getUsers();
    const balance = Promise.all(
      users.map(async (user) => {
        const expenses = await this.participantService.getExpenseOfUser(
          user.id,
        );
        const total = await Promise.all(
          expenses.map(async (expense) => {
            const exp = await this.getExpense(expense);
            if (exp.id_user === user.id) {
              return (
                Number(exp.amount) -
                Number(exp.amount) / exp.participants.length
              );
            } else {
              return -(Number(exp.amount) / exp.participants.length);
            }
          }),
        );
        return {
          user: user,
          balance: total.reduce((a, b) => a + b, 0),
        };
      }),
    );
    return balance;
  }
}
