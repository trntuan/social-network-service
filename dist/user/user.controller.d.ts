import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ActionFriendDto } from './dto/action_friend.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<import("../common/interfaces/register_pesponse").RegisterResponse>;
    myDetail(req: any): Promise<any>;
    getFriendRecoment(req: any): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    getFriendSentToYou(req: any): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    getFriendYouSent(req: any): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    detailUser(id: number): Promise<any>;
    addFriend(req: any, ActionFriendDto: ActionFriendDto): Promise<import("./entities/friendship.entity").Friendship>;
    confirmFriendship(req: any, ActionFriendDto: ActionFriendDto): Promise<import("./entities/friendship.entity").Friendship>;
    cancelFriendship(req: any, ActionFriendDto: ActionFriendDto): Promise<import("./entities/friendship.entity").Friendship>;
    detailUserFriendList(req: any): Promise<{
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    getAllUsers(): Promise<import("./entities/user.entity").User[]>;
    getTeamMemberUsers(): Promise<import("./entities/user.entity").User[]>;
}
