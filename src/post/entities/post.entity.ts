import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ReportPost } from './report_post.entity';
import { CredibilityPost } from './credibility_post.entity';
import { PostImage } from './post_image.entity';
// import { PostImage } from './post_image.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ type: 'varchar', length: 5000 })
  content: string;

  @Column({ type: 'int' })
  user_post: number;

  @Column({ type: 'tinyint', default: 0, comment: '1 có, 0 không' })
  hasImage: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '(0: chỉ mình tôi, 1: bạn bè, 2: tất cả)',
  })
  privacy_type: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  modified_date: Date | null;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => ReportPost, (reportPost) => reportPost.post)
  reportPosts: ReportPost[];

  @OneToMany(() => CredibilityPost, (credibilityPost) => credibilityPost.post)
  department_post: CredibilityPost[];

  @OneToMany(() => PostImage, (postImage) => postImage.post)
  post_images: PostImage[];
}
