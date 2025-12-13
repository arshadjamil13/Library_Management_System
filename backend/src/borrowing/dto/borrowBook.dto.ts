import { IsInt } from 'class-validator';

export class BorrowBookDto {
    @IsInt()
    userId: number;

    @IsInt()
    bookId: number;
}