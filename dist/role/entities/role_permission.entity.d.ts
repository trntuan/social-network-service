import { Role } from './role.entity';
import { Permission } from './permission.entity';
export declare class RolePermission {
    role_id: number;
    permission_id: number;
    role: Role;
    permission: Permission;
}
