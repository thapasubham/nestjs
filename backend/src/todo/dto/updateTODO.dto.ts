import { IsBoolean, isBoolean, IsOptional, IsString } from 'class-validator';

export class updateTodoDto {
  @IsOptional()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;
}
