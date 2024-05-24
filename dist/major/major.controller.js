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
exports.MajorController = void 0;
const common_1 = require("@nestjs/common");
const major_service_1 = require("./major.service");
const create_major_dto_1 = require("./dto/create-major.dto");
const update_major_dto_1 = require("./dto/update-major.dto");
let MajorController = class MajorController {
    constructor(majorService) {
        this.majorService = majorService;
    }
    create(createMajorDto) {
        return this.majorService.create(createMajorDto);
    }
    findAll() {
        return this.majorService.findAll();
    }
    findOne(id) {
        return this.majorService.findOne(+id);
    }
    update(id, updateMajorDto) {
        return this.majorService.update(+id, updateMajorDto);
    }
    remove(id) {
        return this.majorService.remove(+id);
    }
};
exports.MajorController = MajorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_major_dto_1.CreateMajorDto]),
    __metadata("design:returntype", void 0)
], MajorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MajorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MajorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_major_dto_1.UpdateMajorDto]),
    __metadata("design:returntype", void 0)
], MajorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MajorController.prototype, "remove", null);
exports.MajorController = MajorController = __decorate([
    (0, common_1.Controller)('major'),
    __metadata("design:paramtypes", [major_service_1.MajorService])
], MajorController);
//# sourceMappingURL=major.controller.js.map