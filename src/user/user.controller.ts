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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActionFriendDto } from './dto/action_friend.dto';
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
  @UseGuards(AuthUserGuard)
  @Get('friend_sent_to_you')
  async getFriendSentToYou(@Req() req: any) {
    return this.userService.getFriendSentToYou(req['user_data'].id);
  }

  @UseGuards(AuthUserGuard)
  @Get('friend_you_sent')
  async getFriendYouSent(@Req() req: any) {
    return this.userService.getFriendYouSent(req['user_data'].id);
  }

  // ================ cms ================
  @Get('user_detail')
  detailUser(@Query('id') id: number) {
    console.log('id', id);
    return this.userService.findUser(id);
  }

  // @Get('friend_list') // not run
  // detailUserFriendList(@Query('user_id') id: number) {
  //   console.log('id', id);
  //   return this.userService.getUsersExcludingFriends(id);
  // }

  @UseGuards(AuthUserGuard)
  @Post('add_friend')
  async addFriend(@Req() req: any, @Body() ActionFriendDto: ActionFriendDto) {
    return this.userService.createFriendship(
      req['user_data'].id,
      ActionFriendDto.friend_id,
    );
  }

  @UseGuards(AuthUserGuard)
  @Post('confirm_friend')
  async confirmFriendship(
    @Req() req: any,
    @Body() ActionFriendDto: ActionFriendDto,
  ) {
    return this.userService.confirmFriendship(
      req['user_data'].id,
      ActionFriendDto.friend_id,
    );
  }

  @UseGuards(AuthUserGuard)
  @Post('cancel_friend')
  async cancelFriendship(
    @Req() req: any,
    @Body() ActionFriendDto: ActionFriendDto,
  ) {
    return this.userService.cancelFriendship(
      req['user_data'].id,
      ActionFriendDto.friend_id,
    );
  }

  @UseGuards(AuthUserGuard)
  @Get('friend_list_auth') // not run
  detailUserFriendList(@Req() req: any) {
    return this.userService.getUsersFriends(req['user_data'].id);
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
