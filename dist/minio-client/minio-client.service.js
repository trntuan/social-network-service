"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinioClientService = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
let MinioClientService = class MinioClientService {
    async putObjectS3Multiple(images) {
        try {
            const uploadPromises = images.map((image) => this.putObjectGeneral(image));
            const uploadResults = await Promise.all(uploadPromises);
            console.log('All images uploaded successfully');
            return uploadResults;
        }
        catch (error) {
            console.error('Error uploading images:', error);
            throw error;
        }
    }
    async putObjectGeneral(image) {
        try {
            (0, config_1.initAwsBucket)();
            const buffer = image.buffer;
            const mime = image.mimetype;
            const ContentType = { ContentType: mime };
            const originalFileName = image.originalname;
            const sanitizedFileName = originalFileName.replace(/[^a-zA-Z0-9.]/g, '_');
            const randomString = crypto.randomBytes(5).toString('hex');
            const key = randomString + '_' + sanitizedFileName;
            const params = {
                Bucket: config_1.config.MINIO_BUCKET,
                Key: key,
                Body: buffer,
                ...ContentType,
            };
            await (0, config_1.getAwsBucket)().putObject(params).promise();
            return key;
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
};
exports.MinioClientService = MinioClientService;
exports.MinioClientService = MinioClientService = __decorate([
    (0, common_1.Injectable)()
], MinioClientService);
//# sourceMappingURL=minio-client.service.js.map