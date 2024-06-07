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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_entity_1 = require("./entities/chat.entity");
const user_entity_1 = require("../user/entities/user.entity");
let ChatService = class ChatService {
    constructor(chatRepository, messageRepository, userRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    afterInit(socket) {
        console.log('afterInit');
        console.log('afterInit');
    }
    handleDisconnect(socket) {
        console.log('handleDisconnect');
    }
    handleConnection(socket) {
        console.log('handleConnection');
    }
    getChatsForUser(userId) {
        const subQuerySent = this.messageRepository
            .createQueryBuilder('m')
            .select('m.senderId', 'userId')
            .addSelect('m.message_text', 'message_text')
            .addSelect('MAX(m.timestamp)', 'last_message_time')
            .where('m.senderId = :userId')
            .groupBy('m.senderId')
            .getQuery();
        const subQueryReceived = this.messageRepository
            .createQueryBuilder('m')
            .select('m.sender', 'userId')
            .addSelect('m.message_text', 'message_text')
            .addSelect('MAX(m.timestamp)', 'last_message_time')
            .where('m.sender = :userId')
            .groupBy('m.sender')
            .getQuery();
        const query = this.chatRepository
            .createQueryBuilder('chat')
            .leftJoinAndSelect('chat.user1', 'user1')
            .leftJoinAndSelect('chat.user2', 'user2')
            .leftJoin(`(${subQuerySent})`, 'sentMessages', 'user1.user_id = sentMessages.userId')
            .leftJoin(`(${subQueryReceived})`, 'receivedMessages', 'user2.user_id = receivedMessages.userId')
            .select([
            'chat.chat_id',
            'CASE WHEN user1.user_id = :userId THEN user2.display_name ELSE user1.display_name END AS other_user_name',
            'CASE WHEN user1.user_id = :userId THEN user2.avatar ELSE user1.avatar END AS other_user_avatar',
            'CASE WHEN user1.user_id = :userId THEN sentMessages.message_text ELSE receivedMessages.message_text END AS last_message_text',
            'CASE WHEN user1.user_id = :userId THEN sentMessages.last_message_time ELSE receivedMessages.last_message_time END AS last_message_time',
            'CASE WHEN user1.user_id = :userId THEN user2.user_id ELSE user1.user_id END AS other_user_id',
        ])
            .where('user1.user_id = :userId OR user2.user_id = :userId', { userId })
            .orderBy('CASE WHEN user1.user_id = :userId THEN sentMessages.last_message_time ELSE receivedMessages.last_message_time END', 'DESC');
        return query.getRawMany();
    }
    async getChatHistory(chatId, userId) {
        return this.messageRepository
            .createQueryBuilder('message')
            .innerJoinAndSelect('message.sender', 'sender')
            .innerJoinAndSelect('message.chat', 'chat')
            .where('chat.chat_id = :chatId', { chatId })
            .addSelect(`CASE WHEN message.sender_id = :userId THEN 'sent' ELSE 'received' END`, 'message_type')
            .setParameter('userId', userId)
            .select([
            'message.message_id',
            'message.message_text',
            'message.timestamp',
            'sender.user_id',
            'sender.display_name',
            'sender.avatar',
        ])
            .orderBy('message.timestamp', 'DESC')
            .getMany();
    }
    async sendMessage(chatId, senderId, messageText) {
        const chat = await this.chatRepository.findOne({
            where: { chat_id: chatId },
        });
        if (!chat) {
            throw new Error('Chat not found');
        }
        const sender = await this.userRepository.findOne({
            where: { user_id: senderId },
        });
        if (!sender) {
            throw new Error('Sender not found');
        }
        const message = this.messageRepository.create({
            chat: chat,
            sender: sender,
            message_text: messageText,
        });
        await this.messageRepository.save(message);
        this.handleMessage();
        return message;
    }
    async createOrGetChat(user1Id, user2Id) {
        let chat = await this.chatRepository
            .createQueryBuilder('chat')
            .leftJoinAndSelect('chat.user1', 'user1')
            .leftJoinAndSelect('chat.user2', 'user2')
            .where('user1.user_id = :user1Id AND user2.user_id = :user2Id OR user1.user_id = :user2Id AND user2.user_id = :user1Id', { user1Id, user2Id })
            .getOne()
            .catch(() => null);
        if (!chat) {
            const user1 = await this.userRepository.findOne({
                where: { user_id: user1Id },
            });
            const user2 = await this.userRepository.findOne({
                where: { user_id: user2Id },
            });
            if (!user1 || !user2) {
                throw new common_1.NotFoundException('User not found');
            }
            chat = this.chatRepository.create();
            chat.user1 = user1;
            chat.user2 = user2;
            await this.chatRepository.save(chat);
        }
        return chat;
    }
    async handleMessage() {
        console.log('createMessageDto');
        return this.server.emit('receiveMessage');
    }
};
exports.ChatService = ChatService;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatService.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatService.prototype, "handleMessage", null);
exports.ChatService = ChatService = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/socket',
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __param(1, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ChatService);
//# sourceMappingURL=chat.service.js.map