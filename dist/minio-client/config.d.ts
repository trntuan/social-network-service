import { S3 } from 'aws-sdk';
export declare const config: {
    MINIO_ENDPOINT: string;
    MINIO_PORT: number;
    MINIO_ACCESSKEY: string;
    MINIO_SECRETKEY: string;
    MINIO_BUCKET: string;
    externals: {
        nock: string;
        'mock-aws-s3': string;
    }[];
};
declare const initAwsBucket: () => Promise<void>;
declare const getAwsBucket: () => S3;
export { getAwsBucket, initAwsBucket };
