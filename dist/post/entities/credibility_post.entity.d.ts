import { User } from 'src/user/entities/user.entity';
import { Post } from './post.entity';
export declare class CredibilityPost {
    user_id: number;
    post_id: number;
    credibility: number;
    user: User;
    post: Post;
}
