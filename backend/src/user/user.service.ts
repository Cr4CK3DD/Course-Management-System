import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
    async createUser(createUserDto: CreateUserDto) {
        const { username, password } = createUserDto;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });

        return newUser.save();
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username });
    }

    async validateUser(createUserDto: CreateUserDto): Promise<boolean> {
        const {username, password } = createUserDto;

        const findUser = await this.findUserByUsername(username);
    
        if (!findUser) {
            throw new HttpException('User not found', 404);
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        return isMatch;
    }
}
