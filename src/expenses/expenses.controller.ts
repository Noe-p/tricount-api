import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ExpenseDto, ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private service: ExpensesService) {}

  @Get()
  getAll() {
    return this.service.getExpenses();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getExpense(params.id);
  }

  @Post()
  create(@Body() expense: ExpenseDto) {
    return this.service.createExpense(expense);
  }

  @Put(':id')
  update(@Param() params, @Body() expense: ExpenseDto) {
    return this.service.updateExpense(params.id, expense);
  }

  @Delete(':id')
  deleteExpense(@Param() params) {
    return this.service.deleteExpense(params.id);
  }
}

@Controller('totalAmount')
export class TotalAmountController {
  constructor(private service: ExpensesService) {}

  @Get()
  getTotalAmount() {
    return this.service.getTotalAmount();
  }

  @Get(':id')
  getUserAmount(@Param() params) {
    return this.service.getUserAmount(params.id);
  }
}
