import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChats(userId: number): Promise<any[]>;
    getOrCreateChatAndHistory(user1Id: number, user2Id: number): Promise<{
        chat_id: number;
        history: import("./entities/message.entity").Message[];
    }>;
    sendMessage(createMessageDto: CreateMessageDto): Promise<import("./entities/message.entity").Message>;
}
