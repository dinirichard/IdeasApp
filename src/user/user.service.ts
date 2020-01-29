import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserRO } from './dto/user.res.dto';
import { Idea } from 'src/idea/interfaces/idea.model';
import { IdeaRO } from 'src/idea/dto/idea.response.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Idea') private readonly ideaModel: Model<Idea>,
        private readonly jwtService: JwtService,
    ) { }

    async showAll(page: number = 1) {
        const users = await this.userModel.find()
            .limit(25).skip(25 * (page - 1))
            .populate('ideas', '-created')
            .populate('bookmarks', '-created');

        return users.map((user) => {
            return this.toResponseObject(user);
        }
        );
    }

    async read(username: string) {
        const user = await this.userModel.findOne({ username }).exec();
        user.populate('ideas', '-created')
            .populate('bookmarks', '-created');

        return this.toResponseObject(user);
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
            id: result.id,
            created: result.created,
            username: result.username,
            access_token: this.jwtService.sign(payload),
        };
    }

    toResponseObject(user: User): UserRO {
        const checkForIdeas = user.ideas.toString().split(':');
        const checkForBookmarks = user.bookmarks.toString().split(':');
        let ideas;
        let bookmarkers;
        const userRo: UserRO = {
            id: user.id,
            username: user.username,
            created: user.created,
        };

        if (user.ideas.length >= 1) {
            if (checkForIdeas.length > 2) {
                ideas = user.ideas.map((idea): IdeaRO =>
                    ({
                        id: idea.id,
                        idea: idea.idea,
                        description: idea.description,
                        updated: idea.updated,
                    }));
                userRo.ideas = ideas;
            }
        }

        if (user.bookmarks.length >= 1) {
            if (checkForBookmarks.length > 2) {
                bookmarkers = user.bookmarks.map((bookmark): IdeaRO =>
                    ({
                        idea: bookmark.idea,
                        updated: bookmark.updated,
                        description: bookmark.description,
                    }),
                );

                userRo.bookmarks = bookmarkers;
            }

        }
        return userRo;
    }

}
