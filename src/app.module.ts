import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ParticipantsModule } from './participants/participants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'tricount',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'centrale-meteo.c3fbnzbbvbix.eu-west-3.rds.amazonaws.com',
    //   port: 3306,
    //   username: 'meteo_develop',
    //   password: 'Cemotdepassenestpastoto$1',
    //   database: 'centrale-meteo',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: false,
    // }),
    UsersModule,
    CategoriesModule,
    ExpensesModule,
    ParticipantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
