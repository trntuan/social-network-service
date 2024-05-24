"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAwsBucket = exports.getAwsBucket = exports.config = void 0;
const aws_sdk_1 = require("aws-sdk");
exports.config = {
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
    endpoint: exports.config.MINIO_ENDPOINT,
    accessKeyId: exports.config.MINIO_ACCESSKEY,
    secretAccessKey: exports.config.MINIO_SECRETKEY,
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
let awsBucket;
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
        awsBucket = new aws_sdk_1.S3(localSetup);
        await handleEventConnect();
    }
    catch (error) {
        console.log('Error initializing AWS S3:', error);
    }
};
exports.initAwsBucket = initAwsBucket;
const getAwsBucket = () => awsBucket;
exports.getAwsBucket = getAwsBucket;
//# sourceMappingURL=config.js.map