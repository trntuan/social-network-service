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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./team.service");
const action_team_dto_1 = require("./dto/action_team.dto");
let TeamController = class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    async getAllTeams() {
        const teams = await this.teamService.getAllTeams();
        return teams;
    }
    async getTeamById(id) {
        const team = await this.teamService.getTeamById(id);
        return team;
    }
    async addFriend(actionTeamDto) {
        return this.teamService.joinTeam(actionTeamDto.user_id, actionTeamDto.team_id);
    }
    async outTeam(actionTeamDto) {
        return this.teamService.outTeam(actionTeamDto.user_id, actionTeamDto.team_id);
    }
    async getMyTeamsUser(id) {
        console.log('user_id', id);
        const teams = await this.teamService.getTeamsJoinedByUser(id);
        return teams;
    }
    async getMyTeamsRecomemd(id) {
        console.log('user_id', id);
        const teams = await this.teamService.getTeamsNotJoinedByUser(id);
        return teams;
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getAllTeams", null);
__decorate([
    (0, common_1.Get)('detail'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getTeamById", null);
__decorate([
    (0, common_1.Post)('join_team'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [action_team_dto_1.ActionTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Post)('out_team'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [action_team_dto_1.ActionTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "outTeam", null);
__decorate([
    (0, common_1.Get)('my_teams_user'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getMyTeamsUser", null);
__decorate([
    (0, common_1.Get)('teams_recomend'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "getMyTeamsRecomemd", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.Controller)('team'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamController);
//# sourceMappingURL=team.controller.js.map