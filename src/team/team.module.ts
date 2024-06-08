import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMember } from './entities/team_member.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamMember])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
