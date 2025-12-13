import { Body, Controller, Post,Get,Patch,Param,Delete,UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service.js';
import { CreateAuthorDto } from './dto/createAuthor.dto.js';
import { UpdateAuthorDto } from './dto/updateAuthor.dto.js';
import { JwtGuard } from '../auth/guard/jwt.guard.js';

@Controller('authors')
export class AuthorsController {
    constructor (private readonly service:AuthorsService){}

    @UseGuards(JwtGuard)
    @Post()
    async createAuthor(@Body() dto : CreateAuthorDto){
        return this.service.createAuthor(dto);
    }

    @UseGuards(JwtGuard)
    @Get()
    async getAuthors(){
        return this.service.getAuthors();
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    async updateAuthor(@Param('id') id:string, @Body() dto:UpdateAuthorDto){
        return this.service.updateAuthor(Number(id),dto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteAuthor(@Param('id') id:string){
        return this.service.deleteAuthor(Number(id));
    }
}
