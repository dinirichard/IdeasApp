import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { UserDTO } from './dto/user.dto';
import { AuthService } from 'src/shared/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { MyAuthGuard } from 'src/shared/gaurds/auth.gaurd';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService,
        private commentService: CommentService,
        private authService: AuthService,
    ) {
    }

    @Mutation()
    login(@Args() { username, password }) {
        const user: UserDTO = { username, password };
        return this.authService.login(user);
    }

    @Mutation()
    async register(
        @Args('username') username: string,
        @Args('password') password: string,
    ) {
        const user: UserDTO = { username, password };
        return this.userService.register(user);
    }

    @Query()
    users(@Args('page') page: number) {
        return this.userService.showAll(page);
    }

    @Query()
    user(@Args('username') username: string) {
        return this.userService.read(username);
    }

    @Query()
    @UseGuards(new MyAuthGuard())
    whoami(@Context('user') user) {
        const { username } = user;
        return this.userService.read(username);
    }

    @ResolveProperty()
    comments(@Parent() user) {
        const { id } = user;
        return this.commentService.showByUser(id);
    }
}
