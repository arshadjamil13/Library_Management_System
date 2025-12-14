import { Body, Controller, Post ,Get, Patch, Param,Delete,Query,UseGuards} from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/createBook.dto.js';
import { UpdateBookDto } from './dto/updateBook.dto.js';
import { JwtGuard } from '../auth/guard/jwt.guard.js';

@Controller('books')
export class BooksController {
    constructor(private readonly service: BooksService) {}

    @UseGuards(JwtGuard)
    @Post()
    async createBook(@Body() dto:CreateBookDto)  {
        return this.service.createBook(dto)
    }


    @UseGuards(JwtGuard)
    @Get()
    async getBooks(@Query('page') page?:string,
                    @Query('limit') limit?:string,
                    @Query('authorId') authorId?:string,
                    @Query('genre') genre?:string,
                    @Query('title') title?:string,
                    @Query('isBorrowed') isBorrowed?:string){
        return this.service.getBooks({page,limit,authorId,genre,title,isBorrowed});
    }


    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateBook(@Param('id') id:string,@Body() dto:UpdateBookDto){
        return this.service.updateBook(Number(id),dto);
    }


    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteBook(@Param('id') id:number){
        return this.service.deleteBook(Number(id));
    }
}
