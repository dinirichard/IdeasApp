import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeaSchema } from './interfaces/idea.model';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { UserSchema } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Idea', schema: IdeaSchema },
            { name: 'User', schema: UserSchema },
        ]),
        UserModule,
    ],
    controllers: [IdeaController],
    providers: [IdeaService],
})
export class IdeaModule { }
