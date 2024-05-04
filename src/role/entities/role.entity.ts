import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolePermission } from './role_permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ type: 'varchar', length: 50 })
  role_name: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  @JoinTable()
  role_permission: RolePermission[];
}
