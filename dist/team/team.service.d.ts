import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { TeamMember } from './entities/team_member.entity';
export declare class TeamService {
    private teamRepository;
    private teamMemberRepository;
    constructor(teamRepository: Repository<Team>, teamMemberRepository: Repository<TeamMember>);
    joinTeam(user_id: number, group_id: number): Promise<TeamMember>;
    outTeam(user_id: number, group_id: number): Promise<TeamMember>;
    getAllTeams(): Promise<any[]>;
    getTeamsNotJoinedByUser(userId: number): Promise<any[]>;
    getTeamsJoinedByUser(userId: number): Promise<any[]>;
    getTeamById(teamId: number): Promise<Team>;
}
