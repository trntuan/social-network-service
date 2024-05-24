import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
export declare class FileUploadService {
    private minioClientService;
    constructor(minioClientService: MinioClientService);
    uploadSingle(image: BufferedFile): Promise<string>;
}
