import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostImage } from './entities/post_image.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { Comment } from './entities/comment.entity';
import { CredibilityPost } from './entities/credibility_post.entity';
export declare class PostService {
    private postRepository;
    private fileUploadService;
    private postImageRepository;
    private commentRepository;
    private credibilityPostRepository;
    constructor(postRepository: Repository<Post>, fileUploadService: FileUploadService, postImageRepository: Repository<PostImage>, commentRepository: Repository<Comment>, credibilityPostRepository: Repository<CredibilityPost>);
    createPost(createPostDto: CreatePostDto, userId: number, files: BufferedFile): Promise<Post>;
    getAllMyPost(userId: number, page?: number, pageSize?: number): Promise<any[]>;
    getAllPostsReport(page: number, pageSize?: number): Promise<any[]>;
    getAllPosts(page: number, pageSize?: number): Promise<any[]>;
    getPostDetails(postId: number): Promise<any>;
    likePost(userId: number, postId: number, likeValue: number): Promise<{
        statusCode: number;
        message: string;
    }>;
    getCommentPost(postId: number, page?: number, pageSize?: number): Promise<any[]>;
    createPostImage(url: string, postId: number): Promise<PostImage>;
    createComment(content: string, postId: number, userId: number, comment_parent_id: number): Promise<Comment>;
    getAllPostsPersonal(userId: number, page: number, pageSize?: number): Promise<any[]>;
    getPostDetailsPersonal(userId: number, postId: number): Promise<any>;
}
