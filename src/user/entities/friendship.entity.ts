import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Friendship {
  @PrimaryColumn({ name: 'user_id_1' })
  user_id_1: number;

  @PrimaryColumn({ name: 'user_id_2' })
  user_id_2: number;

  @ManyToOne(() => User, (user) => user.friendships1, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id_1' })
  user1: User;

  @ManyToOne(() => User, (user) => user.friendships2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id_2' })
  user2: User;

  @Column({ type: 'tinyint' })
  status_id: number;
}
