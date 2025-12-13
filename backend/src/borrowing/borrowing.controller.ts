import { Body, Controller ,Patch,Post ,Get, Param,UseGuards} from '@nestjs/common';
import { BorrowBookDto } from './dto/borrowBook.dto.js';
import { ReturnBookDto } from './dto/returnBook.dto.js';
import { BorrowingService } from './borrowing.service.js';
import { JwtGuard } from "../auth/guard/jwt.guard.js"

@Controller('borrowing')
export class BorrowingController {
    constructor(private readonly service:BorrowingService) {}

    @UseGuards(JwtGuard)
    @Post('borrow')
    async borrowBook(@Body() dto : BorrowBookDto) {
        return this.service.borrowBook(dto);
    }

    @UseGuards(JwtGuard)
    @Patch('return')
    async returnBook(@Body() dto : ReturnBookDto) {
        return this.service.returnBook(dto);
    }


    @UseGuards(JwtGuard)
    @Get('user/:userId')
    async getUserBorrowedBooks(@Param('userId') userId:string) {
        return this.service.getUserBorrowedBooks(Number(userId));
    }
}
