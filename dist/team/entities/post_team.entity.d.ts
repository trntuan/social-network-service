import { Team } from './team.entity';
import { Post } from 'src/post/entities/post.entity';
export declare class PostTeam {
    team_id: number;
    post_id: number;
    incognito: number;
    approve: number;
    team: Team;
    post: Post;
}
