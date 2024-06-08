import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamMember } from './entities/team_member.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
  ) {}

  //

  async addUserTeam(user_id: number, group_id: number) {
    const teamMember = new TeamMember();
    teamMember.role_id = 3;
    teamMember.team_id = group_id;
    teamMember.user_id = user_id;

    return this.teamMemberRepository.save(teamMember);
  }

  async getAllTeams() {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.teamMembers', 'TeamMember')
      .leftJoinAndSelect('team.postTeam', 'PostTeam')
      .select(['team', 'COUNT(TeamMember.user_id) AS memberCount'])
      .groupBy('team.team_id')
      .getRawMany();
  }

  async getTeamsNotJoinedByUser(userId: number) {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoin('team.teamMembers', 'teamMember')
      .select(['team', 'COUNT(teamMember.user_id) AS memberCount'])
      .where(
        'team.team_id NOT IN (SELECT team_id FROM team_member WHERE user_id = :userId)',
        { userId },
      )
      .groupBy('team.team_id')
      .getRawMany();
  }

  async getTeamsJoinedByUser(userId: number) {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoin('team.teamMembers', 'teamMember')
      .select(['team', 'COUNT(teamMember.user_id) AS memberCount'])
      .where(
        'team.team_id IN (SELECT team_id FROM team_member WHERE user_id = :userId)',
        { userId },
      )
      .groupBy('team.team_id')
      .getRawMany();
  }

  // async getAllTeams() {
  //   return this.teamRepository
  //     .createQueryBuilder('team')
  //     .leftJoinAndSelect('team.teamMembers', 'TeamMember')
  //     .leftJoinAndSelect('team.postTeam', 'PostTeam')
  //     .select(['team', 'COUNT(TeamMember.user_id) AS memberCount'])
  //     .groupBy('team.team_id')
  //     .getRawMany();
  // }

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
