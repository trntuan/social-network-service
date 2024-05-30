import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
export declare class FileUploadController {
    private fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadSingle(image: BufferedFile): Promise<string>;
}
