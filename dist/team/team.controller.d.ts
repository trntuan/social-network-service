import { TeamService } from './team.service';
import { ActionTeamDto } from './dto/action_team.dto';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    getAllTeams(): Promise<any[]>;
    getTeamById(id: number): Promise<import("./entities/team.entity").Team>;
    addFriend(actionTeamDto: ActionTeamDto): Promise<import("./entities/team_member.entity").TeamMember>;
    outTeam(actionTeamDto: ActionTeamDto): Promise<import("./entities/team_member.entity").TeamMember>;
    getMyTeamsUser(id: number): Promise<any[]>;
    getMyTeamsRecomemd(id: number): Promise<any[]>;
}
