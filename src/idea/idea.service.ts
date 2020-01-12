import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, QueryPopulateOptions } from 'mongoose';
import { Idea } from './interfaces/idea.model';
import { IdeaDTO } from './dto/create-idea.dto';
import { User } from 'src/user/models/user.model';
import { IdeaRO } from './dto/idea.response.dto';

@Injectable()
export class IdeaService {
    constructor(
        @InjectModel('Idea') private readonly ideaModel: Model<Idea>,
        @InjectModel('User') private readonly userModel: Model<User>,
    ) { }



    async showAll(): Promise<IdeaRO[]> {
        const ideas = await this.ideaModel.find()
            .populate('author', '-password');

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
        const full = await idea.populate('author', '-password').execPopulate();
        return this.toResponseObject(full);
    }

    async update(
        id: string,
        userId: string,
        data: Partial<IdeaDTO>): Promise<IdeaRO> {  // 'Partial' dont expect entire object
        const updatedIdea = await this.findIdea(id);
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
        const updatedIdea = await this.findIdea(id);
        this.ensureOwnership(updatedIdea, userId);
        const result = await this.ideaModel.deleteOne({ _id: id }).exec();
        if (result.n === 0) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return { deleted: true };
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

    private toResponseObject(idea: Idea): IdeaRO {
        const ideaRo: IdeaRO = {
            id: idea.id,
            idea: idea.idea,
            description: idea.description,
            author: {
                id: idea.author.id,
                username: idea.author.username,
                created: idea.author.created,
            },
            updated: idea.updated,
        };
        return ideaRo;
    }

    private ensureOwnership(idea: Idea, userId: string) {
        if (idea.author.id !== userId) {
            throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
        }

    }
}
