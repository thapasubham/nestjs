import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Todo, TodoService } from './todo.service';
import { CreateTodo } from './dto/createTODO.dto';
import { create } from 'domain';
import { updateTodoDto } from './dto/updateTODO.dto';
@Controller('todo')
export class TodoController {
service : TodoService
    constructor(service: TodoService){
this.service= service;
    }
    @Get()
   async getTodo(){
        return await this.service.get();
        
    }
    @Get(":id")
    async getTodoByID(@Param('id') id: string){
        return await this.service.getTodoByID(id);
    }
    @Post()
    async createTodo(@Body() createTodoDto: CreateTodo){
        const todo: Todo = {name: createTodoDto.name,description: createTodoDto.description}
        return await this.service.createTodo(todo);
    }
    @Put(':id')
    async updateTodo(@Param("id", ParseIntPipe)id: string,@Body()updateTodoDto: updateTodoDto){
        const todo: Todo = {name: updateTodoDto.name, description: updateTodoDto.description}
        return await this.service.updateTodo(id, todo);
    }

}
