import { createHash } from 'crypto';
import AWS from 'aws-sdk';
// import zlib from 'zlib';

export const picS3Config = {
  domain: 'bucket-i6wsm2.s3.us-west-2.amazonaws.com',
  bucketName: 'bucket-i6wsm2',
  accessKeyId: 'AKIA43OLO7KEOT7JT67Y',
  secretAccessKey: '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',
};
export const videoS3Config = {
  domain: 'newhire-video-source71e471f1-13mh24jfdfdgc.s3.amazonaws.com',
  bucketName: 'newhire-video-source71e471f1-13mh24jfdfdgc',
  path: 'assets01/',
  accessKeyId: 'AKIAVUS2TNDE5QNOLNV4',
  secretAccessKey: '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',
};

export const authToken = {};

export const getHash = (text: string, hashtype = 'md5') => createHash(hashtype).update(text).digest('hex');

export const genToken = (name: string, pwd: string) => {
  const token = createHash('md5').update(name + pwd + Date.now()).digest('hex');
  authToken[name] = token;
  return token;
};
export const checkToken = (key: string, token: string) => {
  if (authToken[key] === token) {
    return true;
  }
  return false;
};
export const upload2S3 = (filename, stream: any, config) => {
  const bucketName = config.bucketName;
  const body = stream;

  // Upload the stream
  const s3 = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  });
  return s3.upload({
    Body: body as any,
    Bucket: bucketName,
    Key: (config.path ?? '') + filename,
  }, function(err, data) {
    if (err) {
      throw Error('Error occurred when upload2S3:' + filename + err);
    } else {
      console.log('Uploaded the file at:', data.Location);
    }
  }).promise();
};
