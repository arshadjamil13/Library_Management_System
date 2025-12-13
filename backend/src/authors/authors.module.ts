import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller.js';
import { AuthorsService } from './authors.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService,PrismaService]
})
export class AuthorsModule {}
