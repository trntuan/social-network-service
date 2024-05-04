import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  notice_id: number;

  @Column({ type: 'varchar', length: 100 })
  notice_title: string;

  @Column({ type: 'varchar', length: 5000 })
  notice_content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  notice_created_at: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  notice_updated_at: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  notice_deleted_at: Date | null;
}
