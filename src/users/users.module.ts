import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from 'src/participants/participant.entity/participant.entity';
import { ParticipantsService } from 'src/participants/participants.service';
import { User } from './user.entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Participant, ParticipantsService])],
  providers: [UsersService, ParticipantsService],
  controllers: [UsersController],
})
export class UsersModule {}
