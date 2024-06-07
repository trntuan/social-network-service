import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column({ name: 'user1' })
  user_id_1: number;

  @Column({ name: 'user2' })
  user_id_2: number;

  @ManyToOne(() => User, (user) => user.friendchat1, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user1' })
  user1: User;

  @ManyToOne(() => User, (user) => user.friendchat2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user2' })
  user2: User;
}
