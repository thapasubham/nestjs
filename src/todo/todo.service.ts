import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';

export interface Todo {
  id?: string
  name: string;
  description: string;
  status?: boolean;
  // createdAt?: Date;
  // updatedAt?: Date;
}

export interface TodoDocument extends Todo, Document {
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TodoService {

  constructor(
    @Inject('TODO_MODEL')
    private todoModel: Model<TodoDocument>
  ) { }
  async get(): Promise<TodoDocument[]> {
    return await this.todoModel.find({ deletedAt: null }).lean();
  }

  async createTodo(todo: Todo): Promise<TodoDocument> {
    const result = await this.todoModel.create({
      ...todo,
      status: false,
    });
    return result;
  }

  async getTodoByID(id: string): Promise<TodoDocument> {
    const todo = await this.todoModel.findOne({ _id: id, deletedAt: null }).select('-deletedAt -__v').exec();
    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }

  async updateTodo(id: string, updateTodo: Partial<Todo>): Promise<TodoDocument> {
    const result = await this.todoModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      updateTodo,
      { new: true },
    ).select('-deletedAt').exec();
    if (!result) throw new NotFoundException('Todo not found or already deleted');
    return result;
  }

  async deleteTodo(id: string): Promise<TodoDocument> {
    const deleted = await this.todoModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    ).exec();
    if (!deleted) throw new NotFoundException('Todo not found or already deleted');

    return deleted;
  }
}
