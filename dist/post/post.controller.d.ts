import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { BufferedFile } from 'src/minio-client/file.model';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    post(req: any, files: BufferedFile, createUserDto: CreatePostDto): Promise<import("./entities/post.entity").Post>;
    getAllPosts(page: number, pageSize: number): Promise<any[]>;
    getMyPosts(req: any): Promise<any[]>;
}
