// src/entities/admin.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AdminRole } from './admin_role.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  admin_id: number;

  @Column({ length: 100 })
  admin_name: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  refresh_token: string;

  @OneToMany(() => AdminRole, (adminRole) => adminRole.admin)
  adminRoles: AdminRole[];
}
