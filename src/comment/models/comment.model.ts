import * as mongoose from 'mongoose';
import { User } from 'src/user/models/user.model';
import { Idea } from 'src/idea/interfaces/idea.model';
import { CommentRO } from '../dto/comment.res.dto';
import { UserRO } from 'src/user/dto/user.res.dto';

export const CommentSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true,
    },
    idea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Idea', required: true,
    },
});

export interface Comment extends mongoose.Document {
    id: string;
    created: Date;
    text: string;
    author: User;
    idea: Idea;
    responseFormat(): CommentRO;
}

CommentSchema.method('responseFormat', function (): CommentRO {
    const comment: Comment = this.populate('author', '-password');
    const res: CommentRO = {
        id: comment.id,
        created: comment.created,
        text: comment.text,
        author: {
            id: comment.author.id,
            username: comment.author.username,
            created: comment.author.created,
        } as UserRO,
    };
    return res;
});
