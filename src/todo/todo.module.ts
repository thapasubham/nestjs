import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from '../database/database.module';
import { todoProviders } from './todo.provider';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptors } from '../interceptors/loggin.interceptor';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...todoProviders],
})
export class TodoModule { }
