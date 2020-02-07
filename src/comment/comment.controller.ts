import { Controller, Get, Param, ValidationPipe, UseGuards, UsePipes, Body, Delete, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MyAuthGuard } from '../shared/gaurds/auth.gaurd';
import { User } from '../user/user.decorator';
import { CommentDTO } from './dto/comment.dto';
import { CommentRO } from './dto/comment.res.dto';

@Controller('api/comments')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get('idea/:id')
    showCommentsByIdea(@Param('id') idea: string, @Query('page') page: number): Promise<CommentRO[]> {
        return this.commentService.showByIdea(idea, page);
    }

    @Get('user')
    @UseGuards(new MyAuthGuard())          // replace id with the one from token
    showCommentsByUser(@User('sub') user: string, @Query('page') page: number) {
        return this.commentService.showByUser(user, page);
    }

    @Post('idea/:id')
    @UseGuards(new MyAuthGuard())
    @UsePipes(new ValidationPipe())
    createComment(@Param('id') idea: string, @User('sub') user: string, @Body() data: CommentDTO) {
        return this.commentService.createComment(idea, user, data);
    }

    @Get(':id')
    showComment(@Param('id') id: string) {
        return this.commentService.show(id);
    }

    @Delete(':id')
    @UseGuards(new MyAuthGuard())
    destroyComment(@Param('id') idea: string, @User('sub') user: string) {
        return this.commentService.destroy(idea, user);
    }

}
