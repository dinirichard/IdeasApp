import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Idea } from 'src/idea/interfaces/idea.model';
import { UserRO } from '../dto/user.res.dto';

// Uses javascript types and style
export const UserSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: true },
    ideas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Idea',
        }
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Idea',
        }
    ]
});

UserSchema.pre<User>('save', function (next) {
    const user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next();
    }
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

UserSchema.method('responseFormat', function (): UserRO {
    const user: User = this;
    const res: UserRO = {
        id: user.id,
        username: user.username,
        created: user.created,
        ideas: user.ideas,
    };
    return res;
});

UserSchema.method('comparePassword', function (password: string): boolean {
    if (bcrypt.compareSync(password, this.password)) { return true; }
    return false;
});

// const User = mongoose.model<User>("Users", UserSchema);

export interface User extends mongoose.Document {
    id: string;
    created: Date;
    username: string;
    password: string;
    ideas: Idea[];

    comparePassword(password: string): boolean;

    responseFormat(): UserRO;
}
