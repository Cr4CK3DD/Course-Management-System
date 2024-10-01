import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor( private userService: UserService ) {}
}
