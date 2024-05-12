import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from 'src/user/dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async userlogin(loginDto: LoginDto, cookie: Response): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (user && user.password === password) {
      //generate access token and refresh token
      const payload = { id: user.user_id, email: user.email };
      console.log('payload:', JSON.stringify(payload));
      const token = await this.generateToken(payload);

      console.log('token:', JSON.stringify(token));

      cookie.cookie('token', token.refresh_token);
      const response: any = {
        statusCode: '200',
        message: 'Đăng nhập thành công!',
        email: user.email,
        password: user.password,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
      };

      return response;
    }
  }

  async refreshToken(refresh_token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: this.configService.get<string>('SECRET'),
      });
      const checkExistToken = await this.userRepository.findOneBy({
        email: verify.email,
        refresh_token,
      });

      if (checkExistToken) {
        return this.generateToken({ id: verify.id, email: verify.email });
      } else {
        throw new HttpException(
          'Refresh token is not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async generateToken(payload: { id: number; email: string }) {
    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN'),
    });

    await this.userRepository.update(
      { email: payload.email },
      { refresh_token: refresh_token },
    );

    return { access_token, refresh_token };
  }
}
