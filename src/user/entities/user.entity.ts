import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column()
  email: string;
}
