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

  /// ============== cms ==============

  /// ============ user team ============

  @Get('my_teams_user') /// not create
  async getMyTeamsUser(@Query('id') id: number) {
    console.log('user_id', id);

    const teams = await this.teamService.getAllTeams();
    return teams;
  }
}
