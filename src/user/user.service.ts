import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterResponse as userResponse } from 'src/common/interfaces/register_pesponse';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userRepository.save(createUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: [
        'user_id',
        'display_name',
        'avatar',
        'email',
        'gender',
        'is_active',
      ],
    });
  }
  async findUser(userId: number) {
    return (
      this.userRepository
        .createQueryBuilder('user')
        // .leftJoinAndSelect(
        //   'user.friendships',
        //   'friendship',
        //   'friendship.status_id = 1 AND (friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId)',
        //   { userId },
        // )
        // .leftJoinAndSelect('user.teamMembers', 'teamMember')
        .leftJoinAndSelect('user.posts', 'post')
        .where('user.user_id = :userId', { userId })
        .where('user.user_id = :userId', { userId })
        .addSelect('user.user_id', 'user_id')
        .addSelect('user.display_name', 'display_name')
        .addSelect('user.avatar', 'avatar')
        .addSelect('user.email', 'email')
        .addSelect('user.gender', 'gender')
        .addSelect('user.date_of_birth', 'date_of_birth')
        .addSelect('user.interests', 'interests')
        .addSelect('user.location', 'location')
        .addSelect('user.is_active', 'is_active')
        // 'COUNT(DISTINCT friendship.id) AS friendCount',
        // 'COUNT(DISTINCT teamMember.id) AS teamCount',
        // 'COUNT(DISTINCT post.id) AS postCount',
        .groupBy('user.user_id')
        .getRawOne()
    );
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
  // async validateUser(loginDto: LoginDto): Promise<userResponse> {
  //   const { email, password } = loginDto;

  //   const user = await this.userRepository
  //     .createQueryBuilder('user')
  //     .where('user.email = :email', { email })
  //     .getOne();

  //   if (user && user.password === password) {
  //     const response: userResponse = {
  //       statusCode: '200',
  //       message: 'Đăng nhập thành công!',
  //       user: user,
  //     };

  //     return response;
  //   }

  //   const response: userResponse = {
  //     statusCode: '400',
  //     message: 'tài khoảng hoặc mật khẩu không đúng!',
  //     user: null,
  //   };

  //   return response;
  // }
}

/// select all
// async findUser(userId: number) {
//   return (
//     this.userRepository
//       .createQueryBuilder('user')
// .leftJoinAndSelect(
//   'user.friendships',
//   'friendship',
//   'friendship.status_id = 1 AND (friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId)',
//   { userId },
// )
// .leftJoinAndSelect('user.teamMembers', 'teamMember')
// .leftJoinAndSelect('user.posts', 'post')
// .where('user.user_id = :userId', { userId })
// .select([
//   'user.user_id',
//   'user.display_name',
//   'user.avatar',
//   'user.email',
//   'user.gender',
//   'user.date_of_birth',
//   'user.interests',
//   'user.location',
//   'user.is_active',
// 'COUNT(DISTINCT friendship.id) AS friendCount',
// 'COUNT(DISTINCT teamMember.id) AS teamCount',
// 'COUNT(DISTINCT post.id) AS postCount',
//       ])
//       .groupBy('user.user_id')
//       .getRawOne()
//   );
// }
