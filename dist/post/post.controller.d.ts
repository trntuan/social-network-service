import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { BufferedFile } from 'src/minio-client/file.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikePostDto } from './dto/like-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(req: any, files: BufferedFile, createUserDto: CreatePostDto): Promise<import("./entities/post.entity").Post>;
    likePost(req: any, dto: LikePostDto): Promise<{
        statusCode: number;
        message: string;
    }>;
    createCommemt(req: any, dto: CreateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    getPostDetails(id: number): Promise<any>;
    getComment(id: number, page: number, pageSize: number): Promise<any[]>;
    getAllPosts(page: number, pageSize: number): Promise<any[]>;
    getTeamAllPosts(page: number, teamId: number, pageSize: number): Promise<any[]>;
    getDetailCommentPost(id: number, page: number, pageSize: number): Promise<any[]>;
    getAllPostsReport(id: number, page: number, pageSize: number): Promise<any[]>;
    getPostAllUserCms(user_id: number, page: number, pageSize: number): Promise<any[]>;
    getAllPostsPersonal(req: any, page: number, pageSize: number): Promise<any[]>;
    getPostDetailsPersonal(req: any, id: number): Promise<any>;
    getMyPosts(req: any, page: number, pageSize: number): Promise<any[]>;
}
