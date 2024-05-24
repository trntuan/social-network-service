import { AdminRole } from './admin_role.entity';
export declare class Admin {
    admin_id: number;
    admin_name: string;
    password: string;
    email: string;
    refresh_token: string;
    adminRoles: AdminRole[];
}
