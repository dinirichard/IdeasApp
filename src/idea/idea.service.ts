import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryPopulateOptions } from 'mongoose';
import { Idea } from './interfaces/idea.model';
import { IdeaDTO } from './dto/create-idea.dto';
import { User } from 'src/user/models/user.model';
import { IdeaRO } from './dto/idea.response.dto';
import { UserService } from 'src/user/user.service';
import { Votes } from 'src/shared/votes.enum';
import { CommentRO } from 'src/comment/dto/comment.res.dto';

@Injectable()
export class IdeaService {
    constructor(
        @InjectModel('Idea') private readonly ideaModel: Model<Idea>,
        @InjectModel('User') private readonly userModel: Model<User>,
        private userService: UserService,
    ) { }

    async showAll(page: number = 1, newest: boolean = false): Promise<IdeaRO[]> {

        let ideas;
        if (!newest) {
            ideas = await this.ideaModel.find()
                .limit(25).skip(25 * (page - 1))
                .populate('author', '-password')
                .populate('comments');
        } else {
            ideas = await this.ideaModel.find()
                .limit(25).skip(25 * (page - 1))
                .sort({ created: 'desc' })
                .populate('author', '-password')
                .populate('comments');
        }

        return ideas.map((idea) => {
            return this.toResponseObject(idea);
        });
    }

    async create(userId: string, data: IdeaDTO): Promise<IdeaRO> {
        const user = await this.userModel.findById(userId);
        const newIdea = new this.ideaModel({
            ...data,               // If key name and value name are the same
            author: user.id,
        });

        const result = await newIdea.save();
        user.ideas = [...user.ideas, result._id];
        await user.save();
        await result.populate('author', '-password').execPopulate();
        return this.toResponseObject(result);
    }

    async read(id: string) {
        const idea = await this.findIdea(id);
        const full = await idea
            .populate('author', '-password')
            .populate('upvotes', '-password')
            .populate('downvotes', '-password')
            .populate('comments')
            .execPopulate();
        return this.toResponseObject(full);
    }

    async update(
        id: string,
        userId: string,
        data: Partial<IdeaDTO>): Promise<IdeaRO> {  // 'Partial' dont expect entire object
        const updatedIdea = await (await this.findIdea(id)).populate('comments');
        // await updatedIdea.populate('author', '-password');
        if (data.idea) {
            updatedIdea.idea = data.idea;
        }
        if (data.description) {
            updatedIdea.description = data.description;
        }
        this.ensureOwnership(updatedIdea, userId);
        updatedIdea.save();

        return this.toResponseObject(updatedIdea);
    }

    async destroy(id: string, userId: string) {
        const updatedIdea = await (await this.findIdea(id)).populate('comments');
        this.ensureOwnership(updatedIdea, userId);
        const result = await this.ideaModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return { deleted: true };
    }

    async upvote(id: string, userId: string) {
        let idea = await this.ideaModel.findOne({ _id: id })
            .populate('upvotes', '-password')
            .populate('downvotes', '-password')
            .populate('comments');
        const user = await this.userModel.findById(userId);

        idea = await this.vote(idea, user, Votes.UP);
        return this.toResponseObject(idea);
    }

    async downvote(id: string, userId: string) {
        let idea = await this.ideaModel.findById(id)
            .populate('upvotes', '-password')
            .populate('downvotes', '-password')
            .populate('comments');
        const user = await this.userModel.findById(userId);

        idea = await this.vote(idea, user, Votes.DOWN);

        return this.toResponseObject(idea);
    }



    async bookmark(id: string, userId: string) {
        const idea = await this.ideaModel.findById(id);
        const user = await this.userModel.findById(userId).populate('bookmarks');

        if (!user.bookmarks.some(bookmark => bookmark.id === idea.id)) {
            user.bookmarks.push(idea);
            await user.save();
        } else {
            throw new HttpException('Idea already bookmarked', HttpStatus.BAD_REQUEST);
        }
        return this.userService.toResponseObject(user);
    }

    async unbookmark(id: string, userId: string) {
        const idea = await this.ideaModel.findById(id);
        const user = await this.userModel.findById(userId).populate('bookmarks');

        if (user.bookmarks.some(bookmark => bookmark.id === idea.id)) {
            user.bookmarks = user.bookmarks.filter(
                bookmark => bookmark.id !== idea.id,
            );
            await user.save();

        } else {
            throw new HttpException('Idea already bookmarked', HttpStatus.BAD_REQUEST);
        }
        return this.userService.toResponseObject(user);
    }




    private async findIdea(id: string): Promise<Idea> {
        let idea;
        try {
            idea = await this.ideaModel.findById(id).populate('author', '-password');
        } catch {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return idea;
    }

    private ensureOwnership(idea: Idea, userId: string) {
        if (idea.author.id !== userId) {
            throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
        }

    }

    private async vote(idea: Idea, user: User, vote: Votes) {
        const inverse = vote === Votes.UP ? Votes.DOWN : Votes.UP;

        if (
            idea[inverse].filter(voter => voter.id === user.id).length >= 1 ||
            idea[vote].filter(voter => voter.id === user.id).length >= 1
        ) {
            idea[inverse] = idea[inverse].filter(voter => voter.id !== user.id);
            idea[vote] = idea[vote].filter(voter => voter.id !== user.id);
            await idea.save();
        } else if (
            idea[vote].filter(voter => voter.id === user.id).length < 1
        ) {
            idea[vote].push(user);
            await idea.save();
        } else {
            throw new HttpException('Unable to cast vote', HttpStatus.BAD_REQUEST);
        }

        return idea;
    }








    private toResponseObject(idea: Idea): IdeaRO {
        let author;
        const checkForComments = idea.comments.toString().split(':');

        const ideaRo: IdeaRO = {
            id: idea.id,
            idea: idea.idea,
            description: idea.description,
            updated: idea.updated,
            upvotes: idea.upvotes.length,
            downvotes: idea.downvotes.length,
        };

        if (typeof idea.author !== 'undefined') {
            const checkForAuthor = idea.author.toString().split(':');
            if (checkForAuthor.length > 2) {
                author = {
                    id: idea.author.id,
                    username: idea.author.username,
                    created: idea.author.created,
                };
                ideaRo.author = author;
            }
        }

        if (idea.comments.length >= 1) {
            if (checkForComments.length > 2) {
                const comments = idea.comments.map((comment): CommentRO =>
                    comment.responseFormat(),
                );

                ideaRo.comments = comments;
            }

        }

        return ideaRo;
    }

}
