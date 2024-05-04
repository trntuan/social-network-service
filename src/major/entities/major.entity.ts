import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Department } from './department.entity';
import { UserMajor } from './user_major.entity';
// Import User entity
@Entity()
export class Major {
  @PrimaryGeneratedColumn()
  major_id: number;

  @Column({ length: 50 })
  major_name: string;

  @Column({ length: 20, name: 'department_id' })
  department_id: string;

  //   @ManyToMany(() => User, (user) => user.major) // Define Many-to-Many relationship with User
  //   users: User[]; // Define the property to access Users

  @ManyToOne(() => Department, (department) => department.major, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToMany(() => UserMajor, (userMajor) => userMajor.major, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  userMajor: UserMajor[];
}
