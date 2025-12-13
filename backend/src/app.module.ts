import { Module } from '@nestjs/common';
import { AppController } from '../src/app.controller.js';
import { AppService } from '../src/app.service.js';
import { PrismaService } from "../src/prisma/prisma.service.js"
import { PrismaModule } from "./prisma/prisma.module.js"
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from "./auth/auth.module.js"
import { AuthorsModule } from './authors/authors.module.js';
import { BooksModule } from './books/books.module.js';
import { BorrowingModule } from './borrowing/borrowing.module.js';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true, 
    }),
  PrismaModule,
  AuthModule,
  AuthorsModule,
  BooksModule,
  BorrowingModule],
  
})
export class AppModule {}
