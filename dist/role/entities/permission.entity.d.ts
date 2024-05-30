import { RolePermission } from './role_permission.entity';
export declare class Permission {
    permission_id: number;
    permission_name: string;
    permission_description: string;
    role_permission: RolePermission[];
}
