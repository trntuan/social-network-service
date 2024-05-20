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
}
