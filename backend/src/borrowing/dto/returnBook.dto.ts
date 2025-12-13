import { IsInt } from 'class-validator';

export class ReturnBookDto {
    @IsInt()
  bookId: number;
}
