import { Chat } from './chat.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Message {
    message_id: number;
    chatId: number;
    senderId: number;
    chat: Chat;
    sender: User;
    message_text: string;
    timestamp: Date;
}
