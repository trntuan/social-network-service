import { User } from './user.entity';
export declare class Notification {
    notification_id: number;
    user_id: number;
    content: string;
    is_read: number;
    link_url: number;
    notification_type: number;
    timestamp: Date;
    user: User;
}
