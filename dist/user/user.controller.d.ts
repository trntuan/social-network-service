import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<import("../common/interfaces/register_pesponse").RegisterResponse>;
    myDetail(req: any): Promise<any>;
    getFriendRecoment(req: any): Promise<import("./entities/user.entity").User[] | {
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    detailUser(id: number): Promise<any>;
    detailUserFriendList(id: number): Promise<import("./entities/user.entity").User[] | {
        user_id: number;
        avatar: string;
        display_name: string;
        commonFriends: number;
    }[]>;
    getAllUsers(): Promise<import("./entities/user.entity").User[]>;
    getTeamMemberUsers(): Promise<import("./entities/user.entity").User[]>;
}
