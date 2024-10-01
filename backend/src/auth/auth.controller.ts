import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express'
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService,
        private userService: UserService
    ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const findUser = await this.userService.findUserByUsername(createUserDto.username);

        if (findUser)
            throw new HttpException('User Exist', 409);

        this.userService.createUser(createUserDto);
        
        return ({statusCode: 200, status: "User Created"});
    }

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user;
    }

    @Get('home')
    @UseGuards(JwtAuthGuard)
    home(@Req() req: Request) {
        return req.user;
    }
}
