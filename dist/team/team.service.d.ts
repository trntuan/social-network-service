import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
export declare class TeamService {
    private teamRepository;
    constructor(teamRepository: Repository<Team>);
    getAllTeams(): Promise<any[]>;
    getTeamById(teamId: number): Promise<Team>;
}
