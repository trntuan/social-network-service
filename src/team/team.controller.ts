import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TeamService } from './team.service';
import { ActionTeamDto } from './dto/action_team.dto';

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
    const team = await this.teamService.getTeamById(id);
    return team;
  }

  @Post('join_team')
  async addFriend(@Body() actionTeamDto: ActionTeamDto) {
    return this.teamService.joinTeam(
      actionTeamDto.user_id,
      actionTeamDto.team_id,
    );
  }
  @Post('out_team')
  async outTeam(@Body() actionTeamDto: ActionTeamDto) {
    return this.teamService.outTeam(
      actionTeamDto.user_id,
      actionTeamDto.team_id,
    );
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
}
