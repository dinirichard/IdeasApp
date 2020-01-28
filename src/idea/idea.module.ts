import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeaSchema } from './interfaces/idea.model';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { UserSchema } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { IdeaResolver } from './idea.resolver';
import { CommentSchema } from 'src/comment/models/comment.model';
import { CommentService } from 'src/comment/comment.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Idea', schema: IdeaSchema },
            { name: 'User', schema: UserSchema },
            { name: 'Comment', schema: CommentSchema },
        ]),
        UserModule,
    ],
    controllers: [IdeaController],
    providers: [IdeaService, IdeaResolver, CommentService],
})
export class IdeaModule { }
