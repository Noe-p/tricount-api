import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/participants/participant.entity/participant.entity';
import { ParticipantsService } from 'src/participants/participants.service';
import { User } from 'src/users/user.entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Expense } from './expense.entity/expense.entity';
import {
  ExpensesController,
  TotalAmountController,
} from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Expense,
      Participant,
      ParticipantsService,
      User,
      UsersService,
    ]),
  ],
  providers: [ExpensesService, ParticipantsService, UsersService],
  controllers: [ExpensesController, TotalAmountController],
})
export class ExpensesModule {}
