import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostImage } from './entities/post_image.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
export declare class PostService {
    private postRepository;
    private fileUploadService;
    private postImageRepository;
    constructor(postRepository: Repository<Post>, fileUploadService: FileUploadService, postImageRepository: Repository<PostImage>);
    createPost(createPostDto: CreatePostDto, userId: number, files: BufferedFile): Promise<Post>;
    getAllMyPost(userId: number): Promise<any[]>;
    getAllPosts(page: number, pageSize?: number): Promise<any[]>;
    createPostImage(url: string, postId: number): Promise<PostImage>;
}
