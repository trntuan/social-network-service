// src/entities/admin-roles.entity.ts
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Admin } from './admin.entity';
import { Role } from 'src/role/entities/role.entity';

@Entity()
export class AdminRole {
  @PrimaryColumn()
  admin_id: number;

  @PrimaryColumn()
  role_id: number;

  @ManyToOne(() => Admin, (admin) => admin.adminRoles)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @ManyToOne(() => Role, (role) => role.adminRoles)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
