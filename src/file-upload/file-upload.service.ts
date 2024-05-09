import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    console.log('image', image);
    // const uploaded_image =
    //   await this.minioClientService.putObjectGeneral(image);

    return {
      // image_url: uploaded_image,
      message: 'Successfully uploaded to MinIO S3',
    };
  }
}
