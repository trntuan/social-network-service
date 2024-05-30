import { TeamService } from './team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    getAllTeams(): Promise<any[]>;
    getTeamById(id: number): Promise<import("./entities/team.entity").Team>;
    getMyTeamsUser(id: number): Promise<any[]>;
}
