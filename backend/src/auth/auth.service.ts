import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service.js"
import bcrypt from "bcrypt"
import { SigninDto } from './dto/signin.dto.js';
import { SignupDto } from './dto/signup.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService ,private jwt:JwtService){}
    async signup(dto : SignupDto){
        const uniqueuser = await this.prisma.user.findUnique({
            where : {email : dto.email}
        })
        if(uniqueuser) throw new BadRequestException("Email Already Registered")

        const hashed = await bcrypt.hash(dto.password,10)

        const user = await this.prisma.user.create({
            data :{
                name :dto.name ,
                email : dto.email,
                password : hashed
            }
        })

        const token = this.jwt.sign({id:user.id,email:user.email})

        return {access_token : token,user}
    }

    async signin(dto : SigninDto){
        const user = await this.prisma.user.findUnique({
            where : {email : dto.email}
        })
        if (!user) throw new UnauthorizedException("Account Not Found")

        const match = await bcrypt.compare(dto.password,user.password)
        if(!match) throw new UnauthorizedException("Invalid Credentials")

        const token = this.jwt.sign({id:user.id,email:user.email})
        
        return {access_token : token,user :user}

    }

    async getUser(id : any){
        try{
            const user = await this.prisma.user.findUnique({
                where : {id},
                select:{
                    id : true,
                    name : true,
                    email : true,
                }
            })
            if(!user) throw new BadRequestException("User Not Found")
            return user
        }catch(error){
            throw error
        }
    }

    async getAllUser(id:any){
        try{
            const users = await this.prisma.user.findMany({
                select :{
                    id:true,
                    name : true,
                    email :true
                }
            })
            return users
        }catch(error){
            throw error
        }
    }
}
