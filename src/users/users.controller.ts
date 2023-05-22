import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getAll() {
    return this.service.getUsers();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getUser(params.id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.createUser(user);
  }

  @Put(':id')
  update(@Param() params, @Body() user: User) {
    return this.service.updateUser(params.id, user);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.service.deleteUser(params.id);
  }
}
