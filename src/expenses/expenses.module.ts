import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity/expense.entity';
import {
  ExpensesController,
  TotalAmountController,
} from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpensesService],
  controllers: [ExpensesController, TotalAmountController],
})
export class ExpensesModule {}
