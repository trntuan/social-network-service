import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChats(@Query('userId') userId: number) {
    console.log('userId', userId);

    // console.log('userId');

    return this.chatService.getChatsForUser(userId);
  }

  @Get('history') // ok
  async getOrCreateChatAndHistory(
    @Query('user1Id') user1Id: number,
    @Query('user2Id') user2Id: number,
  ) {
    const chat = await this.chatService.createOrGetChat(user1Id, user2Id);
    const chatHistory = await this.chatService.getChatHistory(
      chat.chat_id,
      user1Id,
    );

    return {
      chat_id: chat.chat_id,
      history: chatHistory,
    };
  }

  @Post('message') // ok
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    const { chatId, senderId, messageText } = createMessageDto;
    return this.chatService.sendMessage(chatId, senderId, messageText);
  }
}
