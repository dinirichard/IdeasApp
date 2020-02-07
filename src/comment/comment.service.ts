import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Idea } from '../idea/interfaces/idea.model';
import { User } from '../user/models/user.model';
import { CommentDTO } from './dto/comment.dto';
import { Comment } from './models/comment.model';
import { CommentRO } from './dto/comment.res.dto';
import { IdeaRO } from 'src/idea/dto/idea.response.dto';
import { IdeaService } from 'src/idea/idea.service';
import { map } from 'rxjs/operators';
import { UserRO } from 'src/user/dto/user.res.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
        @InjectModel('Idea') private readonly ideaModel: Model<Idea>,
        @InjectModel('User') private readonly userModel: Model<User>,
        private userService: UserService,
        private ideaService: IdeaService,
    ) { }

    async showByIdea(idea: string, page: number = 1) {
        const comments = await this.commentModel.find()
            .where({ idea })
            .limit(15 * page)
            // .sort({ created: 'desc' })
            .populate('author', '-password');

        return comments.map(comment =>
            this.toResponseObject(comment));
    }

    async showByUser(id: string, page: number = 1) {
        const comments = await this.commentModel.find({ author: id })
            .limit(25).skip(25 * (page - 1))
            .populate('author', '-password')
            .populate('idea');

        return comments.map(comment => this.toResponseObject(comment));
    }

    async show(id: string) {
        const comment = await this.commentModel.findById(id)
            .populate('author', '-password');
        return this.toResponseObject(comment);
    }

    async createComment(ideaId: string, userId: string, data: CommentDTO) {
        const idea = await this.ideaModel.findById(ideaId);
        const user = await this.userModel.findById(userId);

        const comment = new this.commentModel({
            ...data,
            idea,
            author: user,
        });

        idea.comments.push(comment);

        await idea.save();

        comment.populate('author', '-password');

        return this.toResponseObject(comment);
    }

    async destroy(id: string, userId: string) {
        const comment = await this.commentModel.findById(id)
            .populate('author', '-password')
            .populate('idea', '-author');

        if (comment.author.id !== userId) {
            throw new HttpException('You do not own this comment', HttpStatus.UNAUTHORIZED);
        }

        await this.commentModel.deleteOne(comment);
        return comment;
    }

    private toResponseObject(comment: Comment): CommentRO {
        const checkForIdea = comment.idea.toString().split(':');
        const checkForAuthor = comment.author.toString().split(':');

        const responseObject: CommentRO = {
            id: comment.id,
            created: comment.created,
            text: comment.text,
        };

        if (checkForAuthor.length > 2) {
            responseObject.author = comment.author.responseFormat();
        }

        if (checkForIdea.length > 2) {
            responseObject.idea = comment.idea.responseFormat();
        }
        return responseObject;
    }

}
