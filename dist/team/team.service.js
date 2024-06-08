"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./entities/team.entity");
const typeorm_2 = require("@nestjs/typeorm");
const team_member_entity_1 = require("./entities/team_member.entity");
let TeamService = class TeamService {
    constructor(teamRepository, teamMemberRepository) {
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
    }
    async joinTeam(user_id, group_id) {
        console.log('group_id', group_id);
        if (!group_id) {
            throw new Error('Group ID must be defined');
        }
        const teamMember = new team_member_entity_1.TeamMember();
        teamMember.role_id = 3;
        teamMember.team_id = group_id;
        teamMember.user_id = user_id;
        return this.teamMemberRepository.save(teamMember);
    }
    async outTeam(user_id, group_id) {
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
    async getTeamsNotJoinedByUser(userId) {
        return this.teamRepository
            .createQueryBuilder('team')
            .leftJoin('team.teamMembers', 'teamMember')
            .select(['team', 'COUNT(teamMember.user_id) AS memberCount'])
            .where('team.team_id NOT IN (SELECT team_id FROM team_member WHERE user_id = :userId)', { userId })
            .groupBy('team.team_id')
            .getRawMany();
    }
    async getTeamsJoinedByUser(userId) {
        return this.teamRepository
            .createQueryBuilder('team')
            .leftJoin('team.teamMembers', 'teamMember')
            .select(['team', 'COUNT(teamMember.user_id) AS memberCount'])
            .where('team.team_id IN (SELECT team_id FROM team_member WHERE user_id = :userId)', { userId })
            .groupBy('team.team_id')
            .getRawMany();
    }
    async getTeamById(teamId) {
        return this.teamRepository
            .createQueryBuilder('team')
            .leftJoinAndSelect('team.teamMembers', 'teamMember')
            .leftJoinAndSelect('teamMember.user', 'user')
            .leftJoinAndSelect('teamMember.role', 'role')
            .where('team.team_id = :teamId', { teamId })
            .getOne();
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(team_entity_1.Team)),
    __param(1, (0, typeorm_2.InjectRepository)(team_member_entity_1.TeamMember)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], TeamService);
//# sourceMappingURL=team.service.js.map