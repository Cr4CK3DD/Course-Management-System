import { Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
    {
        id: 1,
        username: "primo",
        password: "pass123"
    },
    {
        id: 2,
        username: "primo1",
        password: "pass1233"
    },
]
@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    validateUser({username, password}: AuthPayloadDto) {
        const findUser = fakeUsers.find((user) => user.username === username);
        if (!findUser) return null;

        if (findUser.password == password) {
            const {password, ...user} = findUser;
            return (this.jwtService.sign(user));
        }
    }
}
