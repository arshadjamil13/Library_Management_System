import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js'
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service.js'
import { JwtStrategy } from './strategy/jwt.strategy.js';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [
    PassportModule,
    JwtModule.registerAsync({
     useFactory :(config:ConfigService) =>({
      secret : config.get<string>('JWT_SECRET'),
      signOptions:{expiresIn : "1d"}
     }),
     inject:[ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,JwtStrategy]
})
export class AuthModule {}
