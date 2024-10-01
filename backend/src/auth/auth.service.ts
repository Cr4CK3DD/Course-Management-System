import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    
    async validateUser({username, password}: AuthPayloadDto) {

        const findUser = await this.userService.findUserByUsername(username);
        if (!findUser)
            return null;
        
        const isRegister = await this.userService.validateUser({username, password})
        if (isRegister)
            return (this.jwtService.sign({username}));

        return null
    }

}
