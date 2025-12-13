import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/createBook.dto.js';
import { UpdateBookDto } from './dto/updateBook.dto.js';


@Injectable()
export class BooksService {
    constructor(private prisma:PrismaService) {}

    async createBook(dto :CreateBookDto){
        try{
            const hasbook = await this.prisma.book.findFirst({
                where: {title:dto.title}
            });
            if(hasbook) throw new BadRequestException("Book with this title already exists");

            const author = await this.prisma.author.findFirst({
                where: {name : dto.authorName}
            })
            if (!author) {
               throw new BadRequestException('Author not found');
            }

            const book = await this.prisma.book.create({
                data:{
                    title : dto.title,
                    description : dto.description,
                    genre : dto.genre,
                    authorId : author.id 
                },
                include:{
                    author: true
                }
            })
            if(!book) throw new BadRequestException("Book Creation Failed");

            return book

        }catch(error){
            throw error
        }
    }

    async getBooks(query : any){
        try{
            const page = query.page ? Number(query.page) : 1;
            const limit = query.limit ? Number(query.limit) : 10;

            const skip = (page -1) * limit ;
            const filters : any = {};

            if(query.authorId) filters.authorId = Number (query.authorId);
            if (query.genre) filters.genre = query.genre;
            if (query.title) filters.title = {contains: query.title, mode:'insensitive'};
            if (query.isBorrowed !== undefined) filters.isBorrowed = query.isBorrowed === 'true';

            const[data,total]= await Promise.all([
                this.prisma.book.findMany({
                    where:filters,
                    skip,
                    take:limit,
                    orderBy:{createdAt:'desc'},
                    include : {
                        author : {
                            select :{
                                id: true,
                                name :true
                            }
                        }
                    }
                }),
                this.prisma.book.count({where:filters})
            ])


            return {data,total,totalPages : Math.ceil(total/limit),page,limit}

        }catch(error){
            throw error
        }
    }


    async updateBook(id:number,dto:UpdateBookDto){
        try{

            const author = await this.prisma.author.findFirst({
                where: {name : dto.authorName}
            })
            if (!author) {
               throw new BadRequestException('Author not found');
            }

            const updateBook = await this.prisma.book.update({
                where : {id},
                 data:{
                    title : dto.title,
                    description : dto.description,
                    genre : dto.genre,
                    authorId : author.id 
                },
                include:{
                    author: true
                }
            })
            if(!updateBook) throw new BadRequestException("Book Update Failed");

            return updateBook
        }catch(error){
            throw error
        }
    }

    async deleteBook(id:number){
        try{
            const deleteBook = await this.prisma.book.delete({
                where : {id}
            })
            if(!deleteBook) throw new BadRequestException("Book Deletion Failed");

            return deleteBook
        }catch(error){
            throw error
        }
    }
}
