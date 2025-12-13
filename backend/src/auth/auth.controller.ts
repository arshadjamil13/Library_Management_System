import { Controller,Post,Body,Get,UseGuards,Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from './dto/signup.dto.js';
import { SigninDto } from './dto/signin.dto.js';
import { JwtGuard } from './guard/jwt.guard.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice:AuthService){}

    @Post('signup')
    async signup(@Body() dto: SignupDto ){ 
        return this.authservice.signup(dto)
    }

    @Post('signin')
    async signin(@Body() dto:SigninDto){
        return this.authservice.signin(dto)
    }

    @UseGuards(JwtGuard)
    @Get('user')
    async getUser(@Req() req){
        return this.authservice.getUser(req.user.id)
    }


    @UseGuards(JwtGuard)
    @Get('alluser')
    async getAllUser(@Req() req){
        return this.authservice.getAllUser(req.user.id)
    }
}
