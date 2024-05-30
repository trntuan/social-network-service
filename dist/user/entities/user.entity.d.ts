import { Friendship } from './friendship.entity';
import { UserMajor } from 'src/major/entities/user_major.entity';
import { Notification } from './notification.entity';
import { Post } from 'src/post/entities/post.entity';
import { ReportPost } from 'src/post/entities/report_post.entity';
import { CredibilityPost } from 'src/post/entities/credibility_post.entity';
import { CredibilityUser } from './credibility_user.entity';
import { Team } from 'src/team/entities/team.entity';
import { TeamMember } from 'src/team/entities/team_member.entity';
import { Comment } from 'src/post/entities/comment.entity';
export declare class User {
    user_id: number;
    display_name: string;
    avatar: string;
    email: string;
    gender: number;
    interests: string;
    location: string;
    date_of_birth: string;
    refresh_token: string;
    language: number;
    password: string;
    created_date: Date;
    is_active: number;
    friendships1: Friendship[];
    friendships2: Friendship[];
    userMajor: UserMajor[];
    notifications: Notification[];
    posts: Post[];
    comments: Comment[];
    reportPosts: ReportPost[];
    credibility_post: CredibilityPost[];
    user_credibility: CredibilityUser[];
    user_believer_id: CredibilityUser[];
    teams: Team[];
    TeamMembers: TeamMember[];
}
