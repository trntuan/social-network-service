import { Team } from './team.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
export declare class TeamMember {
    team_id: number;
    user_id: number;
    role_id: number;
    team: Team;
    user: User;
    role: Role;
}
