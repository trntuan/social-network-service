// import { BufferedFile } from './file.model';
// import * as crypto from 'crypto';
// import { Injectable } from '@nestjs/common';
// import { config } from './config';
// import { awsBucket } from './config';

// @Injectable()
export class MinioClientService {
  // async putObjectGeneral(image) {
  //   try {
  //     const buffer = image.buffer;
  //     const mime = image.mimetype;
  //     const ContentType = { ContentType: mime };
  //     const originalFileName = image.originalname;
  //     const base64EncodedFileName =
  //       Buffer.from(originalFileName).toString('base64');
  //     const hash = crypto
  //       .createHash('md5')
  //       .update(base64EncodedFileName)
  //       .digest('hex');
  //     const key = hash + '_' + originalFileName;
  //     const params = {
  //       Bucket: config.MINIO_BUCKET,
  //       Key: key,
  //       Body: buffer,
  //       ...ContentType,
  //     };
  //     const data = await awsBucket.putObject(params).promise();
  //     console.info(`Upload success for ${originalFileName}`);
  //     return data;
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     throw error;
  //   }
  // }
  // public get client() {
  //   return this.minio.client;
  // }
}
