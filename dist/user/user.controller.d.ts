import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto): Promise<import("../common/interfaces/register_pesponse").RegisterResponse>;
    detailUser(id: number): Promise<any>;
    getAllUsers(): Promise<import("./entities/user.entity").User[]>;
}
