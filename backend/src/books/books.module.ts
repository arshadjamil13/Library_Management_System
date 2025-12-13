import { Module } from '@nestjs/common';
import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [BooksController],
  providers: [BooksService,PrismaService]
})
export class BooksModule {}
