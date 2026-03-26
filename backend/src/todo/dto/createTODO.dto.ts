import { IsString, Length, length } from 'class-validator';

export class CreateTodo {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
