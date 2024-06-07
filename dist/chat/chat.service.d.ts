import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from './entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
export declare class ChatService implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    private chatRepository;
    private messageRepository;
    private userRepository;
    server: Server;
    constructor(chatRepository: Repository<Chat>, messageRepository: Repository<Message>, userRepository: Repository<User>);
    afterInit(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    handleConnection(socket: Socket): void;
    getChatsForUser(userId: number): Promise<any[]>;
    getChatHistory(chatId: number, userId: number): Promise<Message[]>;
    sendMessage(chatId: number, senderId: number, messageText: string): Promise<Message>;
    createOrGetChat(user1Id: number, user2Id: number): Promise<Chat>;
    handleMessage(): Promise<boolean>;
}
