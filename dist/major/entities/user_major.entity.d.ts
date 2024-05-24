import { Major } from './major.entity';
import { User } from 'src/user/entities/user.entity';
export declare class UserMajor {
    user_id: number;
    major_id: number;
    course: number;
    specialized: string;
    user: User;
    major: Major;
}
