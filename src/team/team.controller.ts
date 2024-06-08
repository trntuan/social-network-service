import { Controller, Get, Query } from '@nestjs/common';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get('all')
  async getAllTeams() {
    const teams = await this.teamService.getAllTeams();
    return teams;
  }

  @Get('detail')
  async getTeamById(@Query('id') id: number) {
    console.log('id', id);
    const team = await this.teamService.getTeamById(id);
    return team;
  }

  // addUserTeam

  /// ============== cms ==============

  /// ============ user team ============

  @Get('my_teams_user') /// not create
  async getMyTeamsUser(@Query('user_id') id: number) {
    console.log('user_id', id);

    const teams = await this.teamService.getTeamsJoinedByUser(id);
    return teams;
  }

  @Get('teams_recomend') /// not create
  async getMyTeamsRecomemd(@Query('user_id') id: number) {
    console.log('user_id', id);

    const teams = await this.teamService.getTeamsNotJoinedByUser(id);
    return teams;
  }

  // getTeamsNotJoinedByUser
}
