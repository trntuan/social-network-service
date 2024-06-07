import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Chat } from './chat.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number;

  @Column({ name: 'chat' })
  chatId: number;

  @Column({ name: 'sender' })
  senderId: number;

  @ManyToOne(() => Chat, (chat) => chat.chat_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'chat' })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.user_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sender' })
  sender: User;

  @Column()
  message_text: string;

  @CreateDateColumn()
  timestamp: Date;
}
