import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class CredibilityPost {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;

  @Column({ type: 'tinyint' })
  credibility: number;

  @ManyToOne(() => User, (user) => user.credibility_post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.reportPosts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
