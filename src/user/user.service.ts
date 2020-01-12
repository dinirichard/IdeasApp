import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserRO } from './dto/user.res.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService, ) { }

    async showAll() {
        const users = await this.userModel.find().populate('ideas', '-created');

        return users.map((user) => ({
            id: user.id,
            created: user.created,
            username: user.username,
            idea: user.ideas.map((idea) => ({
                id: idea.id,
                idea: idea.idea,
                desc: idea.description,
                created: idea.created,
            }),
            ),
        })
        );
    }

    async validateUser(data: UserDTO) {
        const user = await this.userModel.findOne({ username: data.username }).exec();
        if (!user) {
            throw new HttpException('No User Found.', HttpStatus.NOT_FOUND);
        }
        if (!user.comparePassword(data.password)) {
            throw new HttpException('Invalid Password!!', HttpStatus.BAD_REQUEST);
        }
        await user.populate('ideas');
        const { password, ...result } = user;    // use a convenient ES6 spread operator 
        // to strip the password property from the user object before returning it
        return user;
    }

    async register(data: UserDTO) {
        const user = await this.userModel.findOne({ username: data.username }).exec();
        if (user) {
            throw new HttpException('User already exists.', HttpStatus.BAD_REQUEST);
        }
        const newUser = new this.userModel({
            username: data.username,                // If key name and value name are the same
            password: data.password,
        });

        const result = await newUser.save();
        const payload = { username: result.username, sub: result.id };
        return {
            username: result.username,
            password: result.password,
            access_token: this.jwtService.sign(payload),
        };
    }

    // private toResponseObject(user: User): UserRO {
    //     const userRo: UserRO = {
    //         id: user.id,
    //         username: user.username,
    //         created: user.created,
    //         ideas: user.ideas.map((idea) =>
    //             ({
    //                 id: idea.id,
    //                 idea: idea.idea,
    //                 description: idea.description,
    //                 updated: idea.updated,
    //             }),
    //     };

    //     return userRo;
    // }

}
