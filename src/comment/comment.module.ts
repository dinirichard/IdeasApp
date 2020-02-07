import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/models/user.model';
import { IdeaSchema } from 'src/idea/interfaces/idea.model';
import { CommentSchema } from './models/comment.model';
import { UserModule } from 'src/user/user.module';
import { CommentResolver } from './comment.resolver';
import { IdeaService } from 'src/idea/idea.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: 'Comment', schema: CommentSchema },
        { name: 'Idea', schema: IdeaSchema },
        { name: 'User', schema: UserSchema },
    ]),
        UserModule,
    ],
    controllers: [CommentController],
    providers: [CommentService, CommentResolver, IdeaService],
})
export class CommentModule { }
