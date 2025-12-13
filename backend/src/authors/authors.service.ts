import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service.js";
import { CreateAuthorDto } from './dto/createAuthor.dto.js';
import { UpdateAuthorDto } from './dto/updateAuthor.dto.js';

@Injectable()
export class AuthorsService {
    constructor(private prisma:PrismaService){}

    async createAuthor(dto:CreateAuthorDto){
        try{
            const hasAuthor= await this.prisma.author.findFirst({
                where:{name:dto.name}
            })
            if(hasAuthor) throw new Error("Author Already Exists");

            
            const author= await this.prisma.author.create({
                data:dto
            })
            if(!author) throw new Error("Author Creation Failed");

            return author
        }catch(error){
            throw error
        }
    }

    async getAuthors(){
        try{
            const authors = await this.prisma.author.findMany({
                orderBy:{createdAt:'desc'}
            });
            if(!authors) throw new Error("No Authors Found");

            return authors
            
        }catch(error){
            throw error
        }
    }

    async updateAuthor(id:number,dto:UpdateAuthorDto){
        try{
        const updateAuthor = await this.prisma.author.update({
            where:{id},
            data:dto
        })

        if(!updateAuthor) throw new Error("Author Update Failed");

        return updateAuthor
        }catch(error){
            throw error
        }
    }

    async deleteAuthor(id:number){
        try{
            const deleteAuthor = await this.prisma.author.delete({
                where : {id}
            })
            if(!deleteAuthor) throw new Error("Author Deletion Failed");

            return deleteAuthor
        }catch(error){
            throw error
        }
    }
}
