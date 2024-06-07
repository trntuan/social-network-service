import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterResponse as userResponse } from 'src/common/interfaces/register_pesponse';
import { Friendship } from './entities/friendship.entity';

export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Friendship)
    private friendshipRepository: Repository<Friendship>,
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
  /// ====================== friend ======================

  async createFriendship(user_id_1: number, user_id_2: number) {
    const friendship = new Friendship();
    friendship.user_id_1 = user_id_1;
    friendship.user_id_2 = user_id_2;
    friendship.status_id = 1;

    return this.friendshipRepository.save(friendship);
  }

  async blockUser(user_id_1: number, user_id_2: number) {
    const friendship = await this.friendshipRepository.findOne({
      where: { user_id_1, user_id_2 },
    });
    if (!friendship) {
      throw new Error('Friendship not found');
    }
    friendship.status_id = 0;
    return this.friendshipRepository.save(friendship);
  }

  async confirmFriendship(user_id_1: number, user_id_2: number) {
    const friendship = await this.friendshipRepository.findOne({
      where: { user_id_1, user_id_2 },
    });
    if (!friendship) {
      throw new Error('Friendship not found');
    }
    friendship.status_id = 2;
    return this.friendshipRepository.save(friendship);
  }

  async cancelFriendship(user_id_1: number, user_id_2: number) {
    const friendship = await this.friendshipRepository.findOne({
      where: { user_id_1, user_id_2 },
    });
    if (!friendship) {
      throw new Error('Friendship not found');
    }
    return this.friendshipRepository.remove(friendship);
  }

  /// ====================== friend ======================

  // danh sách bạn đã gửi
  async getFriendYouSent(userId: number) {
    const excludedUserIds = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .where('friendship.user_id_1 = :userId', { userId })
      .where('(friendship.user_id_1 = :userId) AND friendship.status_id = 1', {
        userId,
      })
      .getMany()
      .then((friendships) =>
        friendships.map((f) =>
          f.user_id_1 === userId ? f.user_id_2 : f.user_id_1,
        ),
      );

    if (excludedUserIds.length === 0) {
      return this.userRepository.find({
        select: ['user_id', 'avatar', 'display_name'],
      });
    }

    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.user_id', 'user.avatar', 'user.display_name'])
      .where('user.user_id IN (:...excludedUserIds)', { excludedUserIds })
      .getMany();

    // Get the list of friends for each user
    const usersWithCommonFriends = await Promise.all(
      users.map(async (user) => {
        const commonFriends = await this.friendshipRepository
          .createQueryBuilder('friendship')
          .where(
            'friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId',
            { userId: user.user_id }, // Use user.user_id instead of userId
          )
          .andWhere('friendship.status_id = 2')
          .getCount();

        return {
          user_id: user.user_id,
          avatar: user.avatar,
          display_name: user.display_name,
          commonFriends: commonFriends ?? 0,
        };
      }),
    );

    return usersWithCommonFriends;
  }
  // danh sách các người gửi lời mời
  async getFriendSentToYou(userId: number) {
    const excludedUserIds = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .where('friendship.user_id_2 = :userId', { userId })
      .where('(friendship.user_id_2 = :userId) AND friendship.status_id = 1', {
        userId,
      })
      .getMany()
      .then((friendships) =>
        friendships.map((f) =>
          f.user_id_1 === userId ? f.user_id_2 : f.user_id_1,
        ),
      );

    if (excludedUserIds.length === 0) {
      return this.userRepository.find({
        select: ['user_id', 'avatar', 'display_name'],
      });
    }

    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.user_id', 'user.avatar', 'user.display_name'])
      .where('user.user_id IN (:...excludedUserIds)', { excludedUserIds })
      .getMany();

    // Get the list of friends for each user
    const usersWithCommonFriends = await Promise.all(
      users.map(async (user) => {
        const commonFriends = await this.friendshipRepository
          .createQueryBuilder('friendship')
          .where(
            'friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId',
            { userId: user.user_id }, // Use user.user_id instead of userId
          )
          .andWhere('friendship.status_id = 2')
          .getCount();

        return {
          user_id: user.user_id,
          avatar: user.avatar,
          display_name: user.display_name,
          commonFriends: commonFriends ?? 0,
        };
      }),
    );

    return usersWithCommonFriends;
  }

  // danh sách các bạn bè bản thân
  async getUsersFriends(userId: number) {
    const excludedUserIds = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .where('friendship.user_id_1 = :userId', { userId })
      .where(
        '(friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId) AND friendship.status_id = 2',
        { userId },
      )
      .getMany()
      .then((friendships) =>
        friendships.map((f) =>
          f.user_id_1 === userId ? f.user_id_2 : f.user_id_1,
        ),
      );

    if (excludedUserIds.length === 0) {
      return this.userRepository.find({
        select: ['user_id', 'avatar', 'display_name'],
      });
    }

    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.user_id', 'user.avatar', 'user.display_name'])
      .where('user.user_id IN (:...excludedUserIds)', { excludedUserIds })
      .getMany();

    // Get the list of friends for each user
    const usersWithCommonFriends = await Promise.all(
      users.map(async (user) => {
        const commonFriends = await this.friendshipRepository
          .createQueryBuilder('friendship')
          .where(
            'friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId',
            { userId: user.user_id }, // Use user.user_id instead of userId
          )
          .andWhere('friendship.status_id = 2')
          .getCount();

        return {
          user_id: user.user_id,
          avatar: user.avatar,
          display_name: user.display_name,
          commonFriends: commonFriends ?? 0,
        };
      }),
    );

    return usersWithCommonFriends;
  }

  // danh sách các bạn đề xuất
  async getUsersExcludingFriends(userId: number) {
    const excludedUserIds = await this.friendshipRepository
      .createQueryBuilder('friendship')
      .where('friendship.user_id_1 = :userId', { userId })
      .orWhere('friendship.user_id_2 = :userId', { userId })
      .andWhere('friendship.status_id = 2')
      .getMany()
      .then((friendships) =>
        friendships.map((f) =>
          f.user_id_1 === userId ? f.user_id_2 : f.user_id_1,
        ),
      );
    // console.log('excludedUserIds:', excludedUserIds);

    if (excludedUserIds.length === 0) {
      // console.log('excludedUserIds:', excludedUserIds);
      return this.userRepository.find({
        select: ['user_id', 'avatar', 'display_name'],
      });
    }

    const users = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.user_id', 'user.avatar', 'user.display_name'])
      .where('user.user_id NOT IN (:...excludedUserIds)', { excludedUserIds })
      .getMany();

    // console.log('users:', users);

    // Get the list of friends for each user
    const usersWithCommonFriends = await Promise.all(
      users.map(async (user) => {
        const commonFriends = await this.friendshipRepository
          .createQueryBuilder('friendship')
          .where(
            'friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId',
            { userId: user.user_id }, // Use user.user_id instead of userId
          )
          .andWhere('friendship.status_id = 2')
          .getCount();

        return {
          user_id: user.user_id,
          avatar: user.avatar,
          display_name: user.display_name,
          commonFriends: commonFriends ?? 0,
        };
      }),
    );

    return usersWithCommonFriends;
  }

  async findUser(userId: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.user_id',
        'user.display_name',
        'user.avatar',
        'user.email',
        'user.gender',
        'user.date_of_birth',
        'user.interests',
        'user.location',
        'user.is_active',
      ])
      .where('user.user_id = :userId', { userId })
      .addSelect((subQuery) => {
        return subQuery
          .select(
            'COALESCE(COUNT(friendship1.user_id_1) + COUNT(friendship2.user_id_2), 0)',
            'friendCount',
          )
          .from('friendship', 'friendship1')
          .where('friendship1.user_id_1 = :userId', { userId })
          .from('friendship', 'friendship2')
          .where('friendship2.user_id_2 = :userId', { userId })
          .andWhere('friendship1.status_id = 2')
          .andWhere('friendship2.status_id = 2');
      }, 'friendCount')
      .groupBy('user.user_id')
      .getRawOne();
  }

  async register(registerDto: CreateUserDto): Promise<userResponse> {
    const { email } = registerDto;

    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const existingUser = await query.getOne();

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

      // console.log('response:', response);
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
