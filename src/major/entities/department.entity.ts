import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Major } from './major.entity';
@Entity()
export class Department {
  @PrimaryColumn({ length: 20 })
  department_id: string;
  @Column({ length: 50 })
  department_name: string;
  @OneToMany(() => Major, (major) => major.department)
  major: Major[];
}
