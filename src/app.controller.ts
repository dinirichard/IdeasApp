import { Controller, Get, UseGuards, Post, Body, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MyAuthGuard } from './shared/gaurds/auth.gaurd';
import { UserService } from './user/user.service';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user/user.decorator';
import { Args } from '@nestjs/graphql';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Get('auth/whoami')
  @UseGuards(new MyAuthGuard())
  showMe(@User('username') username) {
    return this.userService.read(username);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(new MyAuthGuard())
  @Get('api/users')
  showAllUsers(@Query('page') page?: number) {
    return this.userService.showAll(page);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('auth/login')
  login(@Body() data) {
    return this.authService.login(data);
  }

  @Post('auth/register')
  register(@Body() data) {
    return this.userService.register(data);
  }
}
