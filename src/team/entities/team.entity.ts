import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TeamMember } from './team_member.entity';
import { PostTeam } from './post_team.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  team_id: number;

  @Column({ type: 'varchar', length: 100 })
  team_name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  logo: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'int', name: 'creator_user' })
  creator_user_id: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '(0: riêng tư, 1: công khai)',
  })
  privacy_type: number;
  @Column({
    type: 'tinyint',
    default: 0,
    comment: '(0: bài viết đăng tự do, 1: bài viết cần duyệt)',
  })
  review_type: number;

  @ManyToOne(() => User, (user) => user.teams)
  @JoinColumn({ name: 'creator_user' })
  creator_user: User;

  @OneToMany(() => TeamMember, (teamMember) => teamMember.team)
  teamMembers: TeamMember[];

  @OneToMany(() => PostTeam, (postTeam) => postTeam.team)
  postTeam: PostTeam[];
}
