/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from './entities/chat.entity';
import { User } from 'src/user/entities/user.entity';

@WebSocketGateway({
  namespace: '/socket',
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatService
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,

    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(socket: Socket) {
    console.log('afterInit');
    console.log('afterInit');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDisconnect(socket: Socket) {
    console.log('handleDisconnect');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(socket: Socket) {
    console.log('handleConnection');
  }

  getChatsForUser(userId: number) {
    const query = this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.user1', 'user1')
      .leftJoinAndSelect('chat.user2', 'user2')
      .leftJoinAndSelect(
        'message',
        'message',
        'message.chat = chat.chat_id AND message.timestamp = (SELECT MAX(m.timestamp) FROM message m WHERE m.chat = chat.chat_id)',
      )
      .select([
        'chat.chat_id',
        'CASE WHEN user1.user_id = :userId THEN user2.display_name ELSE user1.display_name END AS other_user_name',
        'CASE WHEN user1.user_id = :userId THEN user2.avatar ELSE user1.avatar END AS other_user_avatar',
        'CASE WHEN user1.user_id = :userId THEN user2.user_id ELSE user1.user_id END AS other_user_id',
        'message.message_text AS last_message_text',
        'message.timestamp AS last_message_timestamp',
      ])
      .where('user1.user_id = :userId OR user2.user_id = :userId', { userId });

    return query.getRawMany();
  }

  async getChatHistory(chatId: number, userId: number) {
    return this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.sender', 'sender')
      .innerJoinAndSelect('message.chat', 'chat')
      .where('chat.chat_id = :chatId', { chatId })
      .addSelect(
        `CASE WHEN message.sender_id = :userId THEN 'sent' ELSE 'received' END`,
        'message_type',
      )
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

  async sendMessage(chatId: number, senderId: number, messageText: string) {
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

  async createOrGetChat(user1Id: number, user2Id: number): Promise<Chat> {
    let chat = await this.chatRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.user1', 'user1')
      .leftJoinAndSelect('chat.user2', 'user2')
      .where(
        'user1.user_id = :user1Id AND user2.user_id = :user2Id OR user1.user_id = :user2Id AND user2.user_id = :user1Id',
        { user1Id, user2Id },
      )
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
        throw new NotFoundException('User not found');
      }

      chat = this.chatRepository.create();
      chat.user1 = user1;
      chat.user2 = user2;
      await this.chatRepository.save(chat);
    }

    return chat;
  }
  // async create(createMessageDto: CreateMessageDto): Promise<Message> {
  //   this.handleMessage(createMessageDto);

  //   const message = this.messageRepository.create(createMessageDto);
  //   return this.messageRepository.save(message);
  // }

  @SubscribeMessage('sendMessage')
  async handleMessage() {
    // const message = await this.createMessage(createMessageDto);
    // this.server.emit('receiveMessage', message);

    console.log('createMessageDto');
    return this.server.emit('receiveMessage');
  }

  // private async createMessage(
  //   createMessageDto: CreateMessageDto,
  // ): Promise<Message> {
  //   return this.chatService.create(createMessageDto);
  // }
}

// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   MessageBody,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { ChatService } from './chat.service';
// import { CreateMessageDto } from './dto/create-message.dto';
// import { Message } from './entities/message.entity';

// @WebSocketGateway({
//   namespace: '/socket',
//   cors: {
//     origin: '*',
//   },
// })
// export class ChatGateway {

//   constructor(private readonly chatService: ChatService) {}

// }
