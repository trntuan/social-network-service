import AWS from 'aws-sdk';

export const config = {
  // MINIO_ENDPOINT: 'http://103.82.195.138:9000',
  MINIO_ENDPOINT: 'localhost',
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
  secretAccessKey: config.MINIO_ACCESSKEY,
  sslEnabled: false,
  s3ForcePathStyle: true,
};

const awsBucket = new AWS.S3(localSetup);

export { awsBucket };

// MINIO_ACCESSKEY: 'Lf8lsbNc3tV4ZBsvcLHH',
// MINIO_SECRETKEY: '8977uQUJ5GpAl182wEZqx5RoOeoNOcFRZZwY1IC0',

// old
// MINIO_ACCESSKEY: 'LtueQGbNyeFS3wMBlGh3',
// MINIO_SECRETKEY: 'yzaYjTKtJMYG5mRDDTId0tl11VdFpSpZUI67fMJk',
