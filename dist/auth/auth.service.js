"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const admin_entity_1 = require("../admin/entities/admin.entity");
let AuthService = class AuthService {
    constructor(jwtService, userRepository, adminRepository, configService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.configService = configService;
    }
    async loginAdmin(loginDto, cookie) {
        const { email, password } = loginDto;
        const admin = await this.adminRepository
            .createQueryBuilder('admin')
            .where('admin.email = :email', { email })
            .getOne();
        if (admin && admin.password === password) {
            const payload = { id: admin.admin_id, email: admin.email };
            console.log('payload:', JSON.stringify(payload));
            const token = await this.generateTokenAdmin(payload);
            cookie.cookie('token', token.refresh_token);
            const response = {
                statusCode: '200',
                message: 'Đăng nhập thành công!',
                email: admin.email,
                password: admin.password,
                access_token: token.access_token,
                refresh_token: token.refresh_token,
            };
            return response;
        }
    }
    async generateTokenAdmin(payload) {
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET'),
            expiresIn: this.configService.get('EXP_IN_REFRESH_TOKEN'),
        });
        await this.adminRepository.update({ email: payload.email }, { refresh_token: refresh_token });
        return { access_token, refresh_token };
    }
    async refreshTokenAdmin(refreshToken) {
        try {
            const verify = await this.jwtService.verifyAsync(refreshToken.token, {
                secret: this.configService.get('SECRET'),
            });
            const checkExistToken = await this.adminRepository.findOneBy({
                email: verify.email,
                refresh_token: refreshToken.token,
            });
            console.log('checkExistToken:', checkExistToken);
            if (checkExistToken == null) {
                return this.generateTokenAdmin({ id: verify.id, email: verify.email });
            }
            else {
                throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async loginUser(loginDto, cookie) {
        const { email, password } = loginDto;
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .getOne();
        if (user && user.password === password) {
            const payload = { id: user.user_id, email: user.email };
            console.log('payload:', JSON.stringify(payload));
            const token = await this.generateTokenUser(payload);
            cookie.cookie('token', token.refresh_token);
            const response = {
                statusCode: '200',
                message: 'Đăng nhập thành công!',
                email: user.email,
                user_id: user.user_id,
                password: user.password,
                display_name: user.display_name,
                token: token.access_token,
                refresh_token: token.refresh_token,
            };
            return response;
        }
    }
    async refreshTokenUser(refresh_token) {
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: this.configService.get('SECRET'),
            });
            const checkExistToken = await this.userRepository.findOneBy({
                email: verify.email,
                refresh_token,
            });
            if (checkExistToken) {
                return this.generateTokenUser({ id: verify.id, email: verify.email });
            }
            else {
                throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async generateTokenUser(payload) {
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET'),
            expiresIn: this.configService.get('EXP_IN_REFRESH_TOKEN'),
        });
        await this.userRepository.update({ email: payload.email }, { refresh_token: refresh_token });
        return { access_token, refresh_token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map