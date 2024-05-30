import { AuthService } from './auth.service';
import { LoginDto } from 'src/user/dto/login.dto';
import { Response } from 'express';
import { TokenDto } from './dto/refresh_token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginUser(response: Response, loginDto: LoginDto): Promise<any>;
    loginAdmin(response: Response, loginDto: LoginDto): Promise<any>;
    createTokenAdmin(token: TokenDto): Promise<any>;
}
