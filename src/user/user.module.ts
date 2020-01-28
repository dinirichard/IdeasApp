import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from '../shared/auth/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../shared/auth/constants';
import { IdeaSchema } from '../idea/interfaces/idea.model';
import { UserResolver } from './user.resolver';
import { CommentSchema } from 'src/comment/models/comment.model';
import { CommentModule } from 'src/comment/comment.module';
import { CommentService } from 'src/comment/comment.service';
import { AuthService } from 'src/shared/auth/auth.service';

@Module({
    imports: [
        JwtModule
            .register({
                secretOrPrivateKey: jwtConstants.secret,
                signOptions: { expiresIn: '1h' },
            }),
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Idea', schema: IdeaSchema },
            { name: 'Comment', schema: CommentSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, JwtStrategy,
        UserResolver, CommentService, AuthService],
    exports: [UserService],
})
export class UserModule { }
