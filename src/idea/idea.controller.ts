import {
    Controller, Get, Post, Put,
    Delete, Body, Param, UsePipes, Patch, Logger, UseGuards, Query,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaDTO } from './dto/create-idea.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { MyAuthGuard } from 'src/shared/gaurds/auth.gaurd';
import { User } from 'src/user/user.decorator';

@Controller('api/ideas')
export class IdeaController {

    private logger = new Logger('IdeaController');
    constructor(private ideaService: IdeaService) {
    }

    private logData(options: any) {
        options.id && this.logger.log('USER' + JSON.stringify(options.user));
        options.id && this.logger.log('DATA' + JSON.stringify(options.body));
        options.id && this.logger.log('IDEA' + JSON.stringify(options.id));
    }

    @Get()
    showAllIdeas(@Query('page') page: number) {
        return this.ideaService.showAll(page);
    }

    @Get('/newest')
    showNewestIdeas(@Query('page') page: number) {
        return this.ideaService.showAll(page, true);
    }

    @Post()
    @UseGuards(new MyAuthGuard())
    @UsePipes(new ValidationPipe())
    async createIdea(@User('sub') user, @Body() data: IdeaDTO) {
        this.logData({ user, data });
        return await this.ideaService.create(user, data);
    }

    @Get(':id')
    async readIdea(@Param('id') id: string) {
        return await this.ideaService.read(id);
    }

    @Patch(':id')
    @UseGuards(new MyAuthGuard())
    @UsePipes(new ValidationPipe())
    updateIdea(@Param('id') id: string, @User('sub') user: string, @Body() data: Partial<IdeaDTO>) {
        this.logData({ id, user, data });
        return this.ideaService.update(id, user, data);
    }

    @Delete(':id')
    @UseGuards(new MyAuthGuard())
    destroyIdea(@Param('id') id: string, @User('sub') user: string) {
        this.logData({ id, user });
        return this.ideaService.destroy(id, user);
    }

    @Post(':id/upvote')
    @UseGuards(new MyAuthGuard())
    upvoteIdea(@Param('id') id: string, @User('sub') user: string) {
        this.logData({ id, user });
        return this.ideaService.upvote(id, user);
    }

    @Post(':id/downvote')
    @UseGuards(new MyAuthGuard())
    downvoteIdea(@Param('id') id: string, @User('sub') user: string) {
        this.logData({ id, user });
        return this.ideaService.downvote(id, user);
    }

    @Post(':id/bookmarks')
    @UseGuards(new MyAuthGuard())
    bookmarkIdea(@Param('id') id: string, @User('sub') user: string) {
        this.logData({ id, user });
        return this.ideaService.bookmark(id, user);
    }

    @Delete(':id/bookmark')
    @UseGuards(new MyAuthGuard())
    unbookmarkIdea(@Param('id') id: string, @User('sub') user: string) {
        this.logData({ id, user });
        return this.ideaService.unbookmark(id, user);
    }

}
