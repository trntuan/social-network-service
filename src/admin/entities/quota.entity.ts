import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quota {
  @PrimaryGeneratedColumn()
  quota_id: number;

  @Column({ type: 'varchar', length: 500 })
  quota_name: string;

  @Column({ type: 'int' })
  limit;
}
