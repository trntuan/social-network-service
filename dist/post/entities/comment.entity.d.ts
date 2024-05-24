import { Post } from './post.entity';
export declare class Comment {
    comment_id: number;
    user_id: number;
    post_id: number;
    parent_comment_id: number;
    parent_comment: Comment;
    content: string;
    created_date: Date;
    modified_date: Date;
    post: Post;
}
