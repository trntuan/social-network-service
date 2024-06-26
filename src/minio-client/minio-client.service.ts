import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { config, getAwsBucket, initAwsBucket } from './config';

@Injectable()
export class MinioClientService {
  async putObjectS3Multiple(images) {
    try {
      const uploadPromises = images.map((image) =>
        this.putObjectGeneral(image),
      );
      const uploadResults = await Promise.all(uploadPromises);
      console.log('All images uploaded successfully');
      return uploadResults;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }

  async putObjectGeneral(image) {
    try {
      initAwsBucket();
      const buffer = image.buffer;
      const mime = image.mimetype;
      const ContentType = { ContentType: mime };
      const originalFileName = image.originalname;
      const sanitizedFileName = originalFileName.replace(/[^a-zA-Z0-9.]/g, '_');

      const randomString = crypto.randomBytes(5).toString('hex');
      // const base64EncodedFileName =
      //   Buffer.from(originalFileName).toString('base64');
      // const hash = crypto
      //   .createHash('md5')
      //   .update(base64EncodedFileName)
      //   .digest('hex');
      const key = randomString + '_' + sanitizedFileName;
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
