import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async getAllTeams() {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.teamMembers', 'TeamMember')
      .leftJoinAndSelect('team.postTeam', 'PostTeam')
      .select(['team', 'COUNT(TeamMember.user_id) AS memberCount'])
      .groupBy('team.team_id')
      .getRawMany();
  }

  async getTeamById(teamId: number) {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.teamMembers', 'teamMember')
      .leftJoinAndSelect('teamMember.user', 'user')
      .leftJoinAndSelect('teamMember.role', 'role')
      .where('team.team_id = :teamId', { teamId })
      .getOne();
  }
}
