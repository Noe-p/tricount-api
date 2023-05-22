import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from './expense.entity/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expensesRepository: Repository<Expense>,
    @InjectDataSource() private readonly connection: DataSource,
  ) {}

  async getExpenses(): Promise<Expense[]> {
    return await this.expensesRepository.find();
  }

  async getExpense(_id: string): Promise<Expense[]> {
    return await this.expensesRepository.find({
      select: ['label', 'amount', 'id_user', 'id_category', 'id'],
      where: [{ id: _id }],
    });
  }

  async createExpense(expense: Expense) {
    const id = uuidv4();
    this.expensesRepository.save({ ...expense, id: id });
  }

  async updateExpense(id: number, expense: Expense) {
    this.expensesRepository.update(id, expense);
  }

  async deleteExpense(expense: Expense) {
    this.expensesRepository.delete(expense);
  }

  async getTotalAmount() {
    return await this.expensesRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .getRawOne();
  }

  async getTotalAmountByUser(id: string) {
    return await this.expensesRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.id_user = :id', { id: id })
      .getRawOne();
  }
}
