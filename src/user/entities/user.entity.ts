// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Friendship } from './friendship.entity';
import { UserMajor } from 'src/major/entities/user_major.entity';

import { Notification } from './notification.entity';
import { Post } from 'src/post/entities/post.entity';
import { ReportPost } from 'src/post/entities/report_post.entity';
import { CredibilityPost } from 'src/post/entities/credibility_post.entity';
import { CredibilityUser } from './credibility_user.entity';
import { Team } from 'src/team/entities/team.entity';
import { TeamMember } from 'src/team/entities/team_member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 255 })
  last_name: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: 'tinyint' })
  gender: number;

  @Column({ length: 100, nullable: true })
  interests: string;

  @Column({ length: 100, nullable: true, collation: 'utf8mb4_unicode_ci' })
  location: string;

  @Column({ length: 100, default: '' })
  date_of_birth: string;

  @Column({ length: 200, nullable: true }) /// remove nullable
  refresh_token: string;

  @Column({ default: 1, comment: '1 tieng viet, 2 tieng anh' })
  language: number;

  @Column({ length: 100 })
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ default: 1, comment: '1 hoat dong, 2 khong' })
  is_active: number;

  // @ManyToMany(() => Major)
  // @JoinTable({
  //   name: 'user_major',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
  //   inverseJoinColumn: { name: 'major_id', referencedColumnName: 'major_id' },
  // })
  // major: Major[];

  @ManyToMany(() => UserMajor, (userMajor) => userMajor.user)
  // @JoinTable({
  //   name: 'user_major',
  //   joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
  //   inverseJoinColumn: { name: 'major_id', referencedColumnName: 'major_id' },
  // })
  // userMajor: UserMajor[];
  @OneToMany(() => Friendship, (friendship) => friendship.user1)
  friendships1: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.user2)
  friendships2: Friendship[];

  @OneToMany(() => UserMajor, (userMajor) => userMajor.user)
  userMajor: UserMajor[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]; // Tạo mối quan hệ One-to-Many với entity Post

  @OneToMany(() => ReportPost, (reportPost) => reportPost.user)
  reportPosts: ReportPost[];

  @OneToMany(() => CredibilityPost, (credibilityPost) => credibilityPost.user)
  credibility_post: CredibilityPost[];

  @OneToMany(
    () => CredibilityUser,
    (credibilityUser) => credibilityUser.user_credibility,
  )
  user_credibility: CredibilityUser[];

  @OneToMany(
    () => CredibilityUser,
    (credibilityUser) => credibilityUser.user_believer,
  )
  user_believer_id: CredibilityUser[];

  @OneToMany(() => Team, (team) => team.creator_user)
  teams: Team[];

  @OneToMany(() => TeamMember, (teamMember) => teamMember.user)
  TeamMembers: TeamMember[];
}
