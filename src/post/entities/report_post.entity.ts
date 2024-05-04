// report-post.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class ReportPost {
  @PrimaryGeneratedColumn()
  report_post_id: number;

  @Column({ name: 'user_id', nullable: false })
  user_id: number;

  @Column({ name: 'post_id' })
  post_id: number;

  @ManyToOne(() => Post, (post) => post.reportPosts)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.reportPosts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 500 })
  reason: string;
}
