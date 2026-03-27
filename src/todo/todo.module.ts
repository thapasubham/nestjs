import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { DatabaseModule } from '../database/database.module';
import { todoProviders } from './todo.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...todoProviders],
})
export class TodoModule { }
