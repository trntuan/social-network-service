import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterResponse as userResponse } from 'src/common/interfaces/register_pesponse';
import { Friendship } from './entities/friendship.entity';
export declare class UserService {
    private userRepository;
    private friendshipRepository;
    constructor(userRepository: Repository<User>, friendshipRepository: Repository<Friendship>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    getAllUsers(): Promise<User[]>;
    createFriendship(user_id_1: number, user_id_2: number): Promise<Friendship>;
    blockUser(user_id_1: number, user_id_2: number): Promise<Friendship>;
    confirmFriendship(user_id_1: number, user_id_2: number): Promise<Friendship>;
    cancelFriendship(user_id_1: number, user_id_2: number): Promise<Friendship>;
    getFriendYouSent(userId: number): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    getFriendSentToYou(userId: number): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    getUsersFriends(userId: number): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    getUsersExcludingFriends(userId: number): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    findUser(userId: number): Promise<any>;
    register(registerDto: CreateUserDto): Promise<userResponse>;
}
