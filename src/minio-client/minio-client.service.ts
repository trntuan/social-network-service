import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { config, getAwsBucket, initAwsBucket } from './config';

@Injectable()
export class MinioClientService {
  async putObjectGeneral(image) {
    try {
      initAwsBucket();
      const buffer = image.buffer;
      const mime = image.mimetype;
      const ContentType = { ContentType: mime };
      const originalFileName = image.originalname;
      const base64EncodedFileName =
        Buffer.from(originalFileName).toString('base64');
      const hash = crypto
        .createHash('md5')
        .update(base64EncodedFileName)
        .digest('hex');
      const key = hash + '_' + originalFileName;
      const params = {
        Bucket: config.MINIO_BUCKET,
        Key: key,
        Body: buffer,
        ...ContentType,
      };
      await getAwsBucket().putObject(params).promise();

      return key;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}
