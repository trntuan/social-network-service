import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ type: 'int' })
  notification_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 5000 })
  content: string;

  @Column({ type: 'tinyint', default: 0, comment: '1 đã đọc, 0 là chưa' })
  is_read: number;

  @Column({ type: 'int', nullable: true })
  link_url: number;

  @Column({
    type: 'int',
    comment: ' từ bạn, từ cá nhân, từ quản trị',
    width: 5,
  })
  notification_type: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
