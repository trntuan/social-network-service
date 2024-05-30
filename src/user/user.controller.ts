import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUserGuard } from 'src/auth/auth_user.guard';
// import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @UseGuards(AuthUserGuard)
  @Get('my_detail')
  myDetail(@Req() req: any) {
    return this.userService.findUser(req['user_data'].id);
  }

  @UseGuards(AuthUserGuard)
  @Get('friend_recommend')
  async getFriendRecoment(@Req() req: any) {
    return this.userService.getUsersExcludingFriends(req['user_data'].id);
  }

  // ================ cms ================
  @Get('user_detail')
  detailUser(@Query('id') id: number) {
    console.log('id', id);
    return this.userService.findUser(id);
  }

  @Get('friend_list') // not run
  detailUserFriendList(@Query('user_id') id: number) {
    console.log('id', id);
    return this.userService.getUsersExcludingFriends(id);
  }

  @Get('user_list')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('team_member_list') // not run
  async getTeamMemberUsers() {
    return this.userService.getAllUsers();
  }
}

// @Post('login')
// async login(@Body() loginDto: LoginDto) {
//   return this.userService.validateUser(loginDto);
// }
