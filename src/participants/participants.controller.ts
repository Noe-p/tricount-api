import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Participant } from './participant.entity/participant.entity';
import { ParticipantsService } from './participants.service';

@Controller('participants')
export class ParticipantsController {
  constructor(private service: ParticipantsService) {}

  @Get()
  getAll() {
    return this.service.getParticipants();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getParticipant(params.id);
  }

  @Post()
  create(@Body() participant: string, id_user: string) {
    return this.service.createParticipant(participant, id_user);
  }

  @Put(':id')
  update(@Param() params, @Body() participant: Participant) {
    return this.service.updateParticipant(params.id, participant);
  }

  @Delete(':id')
  deleteParticipant(@Param() params) {
    return this.service.deleteParticipant(params.id);
  }

  @Get('user/:id_user')
  getExpenseOfUser(@Param() params) {
    return this.service.getExpenseOfUser(params.id_user);
  }

  @Get('expense/:id_expense')
  getUserOfExpense(@Param() params) {
    return this.service.getUserOfExpense(params.id_expense);
  }

  @Delete('expense/:id_expense')
  removeAllParticipantsByExpense(@Param() params) {
    return this.service.removeAllParticipantsByExpense(params.id_expense);
  }

  @Delete('user/:id_user')
  removeAllParticipantsByUser(@Param() params) {
    return this.service.removeAllParticipantsByUser(params.id_user);
  }
}
