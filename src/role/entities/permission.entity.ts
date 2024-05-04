import { RolePermission } from './role_permission.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column({ type: 'varchar', length: 50 })
  permission_name: string;

  @Column({ type: 'varchar', length: 200 })
  permission_description: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  @JoinTable()
  role_permission: RolePermission[];
}
