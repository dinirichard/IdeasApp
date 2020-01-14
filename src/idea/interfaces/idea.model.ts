import * as mongoose from 'mongoose';
import { User } from 'src/user/models/user.model';
import { IdeaRO } from '../dto/idea.response.dto';

// Uses javascript types and style
export const IdeaSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    idea: { type: String, required: true },
    description: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true,
    },
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', unique: true,
        },
    ],
    downvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', unique: true,
        },
    ],
});

export interface Idea extends mongoose.Document {
    id: string;
    created: Date;
    updated: Date;
    author: User;
    idea: string;
    description: string;
    upvotes: User[];
    downvotes: User[];

    responseFormat(): IdeaRO;
}

IdeaSchema.pre<Idea>('save', function (next) {
    const idea = this;
    // only hash the password if it has been modified (or is new)
    if (!idea.isModified()) {
        return next();
    }
    idea.updated = new Date();
    next();
});

IdeaSchema.method('responseFormat', function (): IdeaRO {
    const idea: Idea = this;
    const res: IdeaRO = {
        id: idea.id,
        updated: idea.updated,
        idea: idea.idea,
        description: idea.description,
        author: idea.author.responseFormat(),
    };
    return res;
});
