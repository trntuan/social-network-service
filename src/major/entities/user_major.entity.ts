import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Major } from './major.entity';
import { User } from 'src/user/entities/user.entity';
@Entity()
export class UserMajor {
  @PrimaryColumn({ name: 'user_id' })
  user_id: number;

  @PrimaryColumn({ name: 'major_id' })
  major_id: number;

  @Column({ type: 'int', comment: '(61,62)', width: 5 })
  course: number;

  @Column({ type: 'varchar', length: 100, comment: 'chuyen nganh' })
  specialized: string;

  @ManyToOne(() => User, (user) => user.userMajor, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Major, (major) => major.userMajor, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'major_id' })
  major: Major;
}
