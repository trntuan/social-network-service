import { Department } from './department.entity';
import { UserMajor } from './user_major.entity';
export declare class Major {
    major_id: number;
    major_name: string;
    department_id: string;
    department: Department;
    userMajor: UserMajor[];
}
