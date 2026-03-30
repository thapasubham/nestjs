import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Todo, TodoService } from './todo.service';
import { CreateTodo } from './dto/createTODO.dto';
import { updateTodoDto } from './dto/updateTODO.dto';
@Controller('todo')
export class TodoController {
  constructor(private readonly service: TodoService) {}
  @Get()
  async getTodo(@Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number, @Query('limit', new DefaultValuePipe(2),ParseIntPipe) limit: number) {
    return await this.service.get(offset, limit);
  }
  @Get(':id')
  async getTodoByID(@Param('id') id: string) {
    return await this.service.getTodoByID(id);
  }
  @Post()
  async createTodo(@Body() createTodoDto: CreateTodo) {
    return await this.service.createTodo(createTodoDto);
  }
  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: updateTodoDto,
  ) {
    const todo: Partial<Todo> = {};
  if (updateTodoDto.name !== undefined) todo.name = updateTodoDto.name;
  if (updateTodoDto.description !== undefined) todo.description = updateTodoDto.description;
  if (updateTodoDto.status !== undefined) todo.status = updateTodoDto.status;
    return await this.service.updateTodo(id, todo);
  }
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    const result = await this.service.deleteTodo(id);
    return result;
  }
}
