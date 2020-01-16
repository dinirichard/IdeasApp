import * as mongoose from 'mongoose';
import { User } from 'src/user/models/user.model';
import { Idea } from 'src/idea/interfaces/idea.model';
import { CommentRO } from '../dto/comment.res.dto';

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
    const comment: Comment = this;
    const res: CommentRO = {
        id: comment.id,
        created: comment.created,
        text: comment.text,
    };
    return res;
});
