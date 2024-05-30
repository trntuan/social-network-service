import { User } from 'src/user/entities/user.entity';
import { TeamMember } from './team_member.entity';
import { PostTeam } from './post_team.entity';
export declare class Team {
    team_id: number;
    team_name: string;
    logo: string;
    description: string;
    creator_user_id: number;
    privacy_type: number;
    review_type: number;
    creator_user: User;
    teamMembers: TeamMember[];
    postTeam: PostTeam[];
}
