import { Post } from './post.entity';
import { User } from 'src/user/entities/user.entity';
export declare class ReportPost {
    report_post_id: number;
    user_id: number;
    post_id: number;
    post: Post;
    user: User;
    reason: string;
}
