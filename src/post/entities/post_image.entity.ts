import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostImage {
  @PrimaryGeneratedColumn()
  post_image_id: number;

  @Column({ type: 'varchar', length: 255 })
  post_image_url: string;

  @Column({ name: 'post_id' })
  post_id: number;

  @ManyToOne(() => Post, (post) => post.post_images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
