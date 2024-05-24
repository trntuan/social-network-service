import { RolePermission } from './role_permission.entity';
import { TeamMember } from 'src/team/entities/team_member.entity';
import { AdminRole } from 'src/admin/entities/admin_role.entity';
export declare class Role {
    role_id: number;
    role_name: string;
    role_permission: RolePermission[];
    teamMembers: TeamMember[];
    adminRoles: AdminRole[];
}
