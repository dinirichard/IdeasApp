import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from './interfaces/idea.model';
import { IdeaDTO } from './dto/create-idea.dto';

@Injectable()
export class IdeaService {
    constructor(
        @InjectModel('Idea')
        private readonly ideaModel: Model<Idea>,
    ) { }

    async showAll() {
        return await this.ideaModel.find();
    }

    async create(data: IdeaDTO) {
        const idea = await this.ideaModel.create(data);
        await this.ideaModel.save(idea);
        return idea;
    }

    async read(id: string) {
        const idea = await this.findIdea(id);
        return idea;
    }

    async update(id: string, data: Partial<IdeaDTO>) {  // 'Partial' dont expect entire object
        const idea = await this.findIdea(id);
        await this.ideaModel.update({ id }, data);
        return idea;
    }

    async destroy(id: string) {
        const idea = await this.findIdea(id);
        await this.ideaModel.delete({ id });
        return { deleted: true };
    }

    private async findIdea(id: string): Promise<Idea> {
        let idea;
        try {
            idea = await this.ideaModel.findById(id);
        } catch {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        if (!idea) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return idea;
    }


}
