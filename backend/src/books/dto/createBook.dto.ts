import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsString()
  authorName: string;
}
