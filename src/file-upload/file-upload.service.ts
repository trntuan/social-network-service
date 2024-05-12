import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';

@Injectable()
export class FileUploadService {
  constructor(private minioClientService: MinioClientService) {}

  async uploadSingle(image: BufferedFile) {
    const uploaded_image =
      await this.minioClientService.putObjectGeneral(image);

    console.log('Successfully', uploaded_image);
    return uploaded_image;
  }

  // async uploadMultiple(images: BufferedFile[]) {
  //   const uploaded_images = await Promise.all(
  //     images.map(async (image) => await this.uploadSingle(image)),
  //   );

  //   return uploaded_images;
  // }
}
