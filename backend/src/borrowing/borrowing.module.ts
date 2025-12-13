import { Module } from '@nestjs/common';
import { BorrowingController } from './borrowing.controller.js';
import { BorrowingService } from './borrowing.service.js';
import { PrismaService } from "../prisma/prisma.service.js";

@Module({
  controllers: [BorrowingController],
  providers: [BorrowingService,PrismaService]
})
export class BorrowingModule {}
