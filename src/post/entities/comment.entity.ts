import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  @Column({ nullable: true })
  parent_comment_id: number;

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: 'parent_comment_id' })
  parent_comment: Comment;

  @Column({ length: 500 })
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ nullable: true })
  modified_date: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
