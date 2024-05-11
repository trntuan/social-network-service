import { S3 } from 'aws-sdk';
export const config = {
  // MINIO_ENDPOINT: 'http://103.82.195.138:9000',
  MINIO_ENDPOINT: 'http://103.82.195.138:9000',
  MINIO_PORT: 9001,
  MINIO_ACCESSKEY: 'Lf8lsbNc3tV4ZBsvcLHH',
  MINIO_SECRETKEY: '8977uQUJ5GpAl182wEZqx5RoOeoNOcFRZZwY1IC0',
  MINIO_BUCKET: 'social',
  externals: [
    {
      nock: 'commonjs2 nock',
      'mock-aws-s3': 'commonjs2 mock-aws-s3',
    },
  ],
};
const localSetup = {
  endpoint: config.MINIO_ENDPOINT,
  accessKeyId: config.MINIO_ACCESSKEY,
  secretAccessKey: config.MINIO_SECRETKEY,
  sslEnabled: false,
  s3ForcePathStyle: true,
  region: 'us-east-1',
  useAccelerateEndpoint: true,
  useDualstackEndpoint: true,
  signatureVersion: 'v4',
  httpOptions: {
    timeout: 10 * 60 * 1000,
  },
};

let awsBucket: S3;

const handleEventConnect = async () => {
  const params = {
    Bucket: 'social',
  };
  await awsBucket.listObjects(params).promise();
  return console.info('CONNECTED TO S3 BUCKET SUCCESS 🦩!!');
};

const initAwsBucket = async () => {
  try {
    console.log(localSetup);
    awsBucket = new S3(localSetup);
    await handleEventConnect();
  } catch (error) {
    console.log('Error initializing AWS S3:', error);
  }
};

const getAwsBucket = () => awsBucket;

export { getAwsBucket, initAwsBucket };
