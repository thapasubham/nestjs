import { IsString } from 'class-validator';

export class updateTodoDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
