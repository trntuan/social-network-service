import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get('detail')
  detailUser(@Query('id') id: number) {
    console.log('id', id);
    return this.userService.findUser(id);
  }

  @Get('user_list')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('friend_recommend')
  async getFriendRecoment(@Query('userId') userId: number) {
    return this.userService.getUsersExcludingFriends(userId);
  }

  // @Post('login')
  // async login(@Body() loginDto: LoginDto) {
  //   return this.userService.validateUser(loginDto);
  // }
}
