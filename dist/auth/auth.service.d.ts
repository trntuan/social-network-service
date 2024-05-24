import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from 'src/user/dto/login.dto';
import { Response } from 'express';
import { Admin } from 'src/admin/entities/admin.entity';
import { TokenDto } from './dto/refresh_token.dto';
export declare class AuthService {
    private jwtService;
    private userRepository;
    private adminRepository;
    private configService;
    constructor(jwtService: JwtService, userRepository: Repository<User>, adminRepository: Repository<Admin>, configService: ConfigService);
    loginAdmin(loginDto: LoginDto, cookie: Response): Promise<any>;
    private generateTokenAdmin;
    refreshTokenAdmin(refreshToken: TokenDto): Promise<any>;
    loginUser(loginDto: LoginDto, cookie: Response): Promise<any>;
    refreshTokenUser(refresh_token: string): Promise<any>;
    private generateTokenUser;
}
