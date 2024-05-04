import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolePermission } from './role_permission.entity';
import { TeamMember } from 'src/team/entities/team_member.entity';
import { AdminRole } from 'src/admin/entities/admin_role.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ type: 'varchar', length: 50 })
  role_name: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  @JoinTable()
  role_permission: RolePermission[];

  @OneToMany(() => TeamMember, (teamMember) => teamMember.role)
  @JoinTable()
  teamMembers: TeamMember[];

  @OneToMany(() => AdminRole, (adminRole) => adminRole.role)
  adminRoles: AdminRole[];
}
