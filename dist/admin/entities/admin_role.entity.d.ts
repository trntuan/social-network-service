import { Admin } from './admin.entity';
import { Role } from 'src/role/entities/role.entity';
export declare class AdminRole {
    admin_id: number;
    role_id: number;
    admin: Admin;
    role: Role;
}
