import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service.js";
import { BorrowBookDto } from './dto/borrowBook.dto.js';
import { ReturnBookDto } from './dto/returnBook.dto.js';

@Injectable()
export class BorrowingService {
    constructor(private prisma:PrismaService ) {}

    async borrowBook(dto:BorrowBookDto){
        try{
            const {userId, bookId} = dto;
            const existing = await this.prisma.borrowedBook.findFirst({
                where : {bookId}
            })
            

            if(existing && !existing.returnedAt){
                throw new NotFoundException("Book is already borrowed");
            }
            
            const result = await this.prisma.$transaction(async (prisma) => {
            const borrow = await prisma.borrowedBook.create({
                data : {
                    userId,
                    bookId,
                    }
            })

            await this.prisma.book.update({
                where: {id: bookId},
                data: {isBorrowed: true}
            })

            

            return borrow;
        })
            
            return {message : "Book borrowed successfully", result}
        }
        catch(error){
            throw error
        }
    }


    async returnBook(dto : ReturnBookDto){
        try{
            const {bookId} = dto;
            const borrowed = await this.prisma.borrowedBook.findFirst({
                where : {bookId : bookId,
                    returnedAt : null
                }
            })

            if (!borrowed || borrowed.returnedAt != null) {
                throw new NotFoundException("Book is not currently borrowed");
            }

            const result = await this.prisma.$transaction(async (prisma) => {

            const updated = await this.prisma.borrowedBook.updateMany({
                where : {bookId},
                data : {returnedAt: new Date()}
            })

            await this.prisma.book.update({
                where : {id : bookId},
                data : {isBorrowed: false}
            })
            return updated;
        })

            return {message : "Book returned successfully", result}
        }catch(error){
            throw error
        }
    }

    async getUserBorrowedBooks(userId:number){
        try{
            const borrowedBooks = await this.prisma.borrowedBook.findMany({
                where : {userId, returnedAt: null},
                include : {book:{
                            select:{
                                id :true,
                                title : true,
                                description: true,
                                genre : true,
                                isbn : true,
                                isBorrowed : true,
                                author : {
                                    select:{
                                        id : true,
                                        name : true
                                    }
                                },
                            }
                        }}
            })

            if (borrowedBooks.length === 0 || !borrowedBooks){
                throw new NotFoundException("No borrowed books found for this user");
            }

            return borrowedBooks
        }catch(error){
            throw error
        }
    }
}
