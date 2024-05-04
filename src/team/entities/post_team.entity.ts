import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Team } from './team.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class PostTeam {
  @PrimaryColumn({ name: 'team_id' })
  team_id: number;

  @PrimaryColumn({ name: 'post_id' })
  post_id: number;

  @Column({ type: 'tinyint', default: 0, comment: '1 có ẩn danh, 0 không' })
  incognito: number;

  @Column({ type: 'tinyint', default: 1, comment: '1 có chấp thuân, 0 không' })
  approve: number;

  @ManyToOne(() => Team, (team) => team.postTeam, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => Post, (post) => post.postTeam, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
