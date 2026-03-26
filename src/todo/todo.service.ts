import { Injectable, NotFoundException } from '@nestjs/common';
import { readFile, writeFile } from '../utils/fileReader';

export interface Todo {
  id?: number;
  name: string;
  description: string;
  status?: boolean;
}

@Injectable()
export class TodoService {

  async get(): Promise<Todo[]> {
    return await readFile<Todo>();
  }

  async createTodo(todo: Todo): Promise<Todo> {
    const todos = await readFile<Todo>();

    const newTodo: Todo = {
      ...todo,
      id: Date.now(),
      status: false,
    };

    todos.push(newTodo);
    await writeFile(todos);

    return newTodo;
  }

  async getTodoByID(id: number): Promise<Todo> {
    const todos = await readFile<Todo>();

    const todo = todos.find(t => t.id === id);
    if (!todo) throw new NotFoundException('Todo not found');

    return todo;
  }

  async updateTodo(id: number, updateTodo: Partial<Todo>): Promise<Todo> {
    const todos = await readFile<Todo>();

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Todo not found');

    todos[index] = {
      ...todos[index],
      ...updateTodo,
    };

    await writeFile(todos);
    return todos[index];
  }

  async deleteTodo(id: number): Promise<Todo> {
    const todos = await readFile<Todo>();

    const index = todos.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException('Todo not found');

    const deleted = todos[index];
    todos.splice(index, 1);

    await writeFile(todos);
    return deleted;
  }
}