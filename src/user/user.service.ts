import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterResponse as userResponse } from 'src/common/interfaces/register_pesponse';
import { LoginDto } from './dto/login.dto';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userRepository.save(createUserDto);
  }

  async register(registerDto: CreateUserDto): Promise<userResponse> {
    const { email } = registerDto;
    console.log('registerDto:', registerDto);
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const existingUser = await query.getOne();
    console.log('existingUser:', existingUser);
    if (existingUser) {
      const response: userResponse = {
        statusCode: '400',
        message: 'Email đã tồn tại!',
        user: null,
      };
      return response;
    } else {
      const user = await this.userRepository.save(registerDto);

      const response: userResponse = {
        statusCode: '200',
        message: 'Đăng ký thành công!',
        user: user,
      };

      console.log('response:', response);
      return response;
    }
  }

  async validateUser(loginDto: LoginDto): Promise<userResponse> {
    const { email, password } = loginDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (user && user.password === password) {
      const response: userResponse = {
        statusCode: '200',
        message: 'Đăng nhập thành công!',
        user: user,
      };

      return response;
    }

    const response: userResponse = {
      statusCode: '400',
      message: 'tài khoảng hoặc mật khẩu không đúng!',
      user: null,
    };

    return response;
  }
}
