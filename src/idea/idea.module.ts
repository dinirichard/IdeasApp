import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeaSchema } from './interfaces/idea.model';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Idea', schema: IdeaSchema }])],
    controllers: [IdeaController],
    providers: [IdeaService],
})
export class IdeaModule { }
