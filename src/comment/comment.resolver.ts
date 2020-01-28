import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UseGuards } from '@nestjs/common';
import { MyAuthGuard } from 'src/shared/gaurds/auth.gaurd';
import { CommentDTO } from './dto/comment.dto';

@Resolver()
export class CommentResolver {
    constructor(private readonly commentService: CommentService) {
    }

    @Query()
    comment(@Args('id') id: string) {
        return this.commentService.show(id);
    }

    @Mutation()
    @UseGuards(new MyAuthGuard())
    createComment(
        @Args('idea') ideaId: string,
        @Args('text') text: string,
        @Context('user') user,
    ) {
        const data: CommentDTO = { text };
        const { id: userId } = user;

        return this.commentService.createComment(ideaId, userId, data);
    }

    @Mutation()
    @UseGuards(new MyAuthGuard())
    deleteComment(@Args('id') ideaId: string, @Context('sub') user) {
        const { id: userId } = user;

        return this.commentService.destroy(ideaId, userId);
    }
}
