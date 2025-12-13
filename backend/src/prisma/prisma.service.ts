import { Injectable,OnModuleInit,OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as pg from "pg" ;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy,OnModuleInit{
    constructor(config : ConfigService) {
        const pool = new pg.Pool({
      connectionString: config.get('DATABASE_URL'), // Get URL from .env via ConfigService
    });

    const adapter = new PrismaPg(pool);

    super({
      log: ['query', 'info', 'warn', 'error'],
      adapter : adapter
      // Optional: Add accelerateUrl: "" if your TypeScript still throws the error
    });
  }

    async onModuleInit() {
    await this.$connect();
    console.log('Prisma database connection established.'); 
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma database connection closed.');
  }
}
