import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CredibilityUser {
  @PrimaryColumn({ name: 'user_credibility' })
  user_credibility_id: number;

  @PrimaryColumn({ name: 'user_believer' })
  user_believer_id: number;

  @ManyToOne(() => User, (user) => user.friendships1, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_credibility' })
  user_credibility: User;

  @ManyToOne(() => User, (user) => user.friendships2, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_believer' })
  user_believer: User;

  @Column({ type: 'tinyint' })
  credibility: number;
}
