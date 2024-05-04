import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.teams)
  @JoinColumn({ name: 'creator_user' })
  creator_user: User;
}
