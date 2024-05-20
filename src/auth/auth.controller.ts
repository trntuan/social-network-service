import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { Response } from 'express';
import { TokenDto } from './dto/refresh_token.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  loginUser(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.loginUser(loginDto, response);
  }

  @Post('admin')
  loginAdmin(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.loginAdmin(loginDto, response);
  }

  @Post('admin/refresh_token')
  createTokenAdmin(@Body() token: TokenDto) {
    return this.authService.refreshTokenAdmin(token);
  }
}
