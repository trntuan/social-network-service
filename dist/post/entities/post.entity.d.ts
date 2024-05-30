import { User } from 'src/user/entities/user.entity';
import { ReportPost } from './report_post.entity';
import { CredibilityPost } from './credibility_post.entity';
import { PostImage } from './post_image.entity';
import { PostTeam } from 'src/team/entities/post_team.entity';
import { Comment } from './comment.entity';
export declare class Post {
    post_id: number;
    content: string;
    user_post: number;
    hasImage: number;
    privacy_type: number;
    created_date: Date;
    modified_date: Date | null;
    user: User;
    reportPosts: ReportPost[];
    department_post: CredibilityPost[];
    post_images: PostImage[];
    postTeam: PostTeam[];
    comments: Comment[];
}
