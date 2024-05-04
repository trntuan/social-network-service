import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity()
export class RolePermission {
  @PrimaryColumn({ name: 'role_id' })
  role_id: number;

  @PrimaryColumn({ name: 'permission_id' })
  permission_id: number;

  @ManyToOne(() => Role, (role) => role.role_permission, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.role_permission, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;
}
