import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';

export interface Todo {
  name: string;
  description: string;
  status?: boolean;
}

export interface TodoDocument extends Todo, Document { }

@Injectable()
export class TodoService {

  constructor(
    @Inject('TODO_MODEL')
    private todoModel: Model<TodoDocument>
  ) { }
  async get(): Promise<TodoDocument[]> {
    return this.todoModel.find().exec();
  }

  async createTodo(todo: Todo): Promise<TodoDocument> {
    const result = await this.todoModel.create({
      ...todo,
      status: false,
    });
    return result;
  }

  async getTodoByID(id: string): Promise<TodoDocument> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }

  async updateTodo(id: string, updateTodo: Partial<Todo>): Promise<TodoDocument> {
    const result = await this.todoModel.findByIdAndUpdate(id, updateTodo, { new: true }).exec();
    if (!result) throw new NotFoundException('Todo not found');
    return result;
  }

  async deleteTodo(id: string): Promise<TodoDocument> {
    const deleted = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Todo not found');

    return deleted;
  }
}
