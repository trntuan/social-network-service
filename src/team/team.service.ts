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

  async joinTeam(user_id: number, group_id: number) {
    console.log('group_id', group_id);
    if (!group_id) {
      throw new Error('Group ID must be defined');
    }

    const teamMember = new TeamMember();
    teamMember.role_id = 3;
    teamMember.team_id = group_id;
    teamMember.user_id = user_id;

    return this.teamMemberRepository.save(teamMember);
  }

  async outTeam(user_id: number, group_id: number) {
    const team = await this.teamMemberRepository.findOne({
      where: { user_id, team_id: group_id },
    });
    if (!team) {
      throw new Error('Friendship not found');
    }
    return this.teamMemberRepository.remove(team);
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
