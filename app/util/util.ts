import { createHash, createDecipher } from 'crypto';
import AWS from 'aws-sdk';

const secretkey = 'password';
// function encrypt(content) {
//   const cipher = createCipher('aes192', secretkey);
//   let enc = cipher.update(content, 'utf8', 'hex');
//   return (enc += cipher.final('hex'));
// }
export function decrypt(enc) {
  const decipher = createDecipher('aes192', secretkey);
  let dec = decipher.update(enc, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

export const picS3Config = {
  domain: 'bucket-i6wsm2.s3.us-west-2.amazonaws.com',
  bucketName: 'bucket-i6wsm2',
  accessKeyId: '4f2daa10dc574cbef00be1711f8537b5c6fc96cab8f388d7075bc581e69b54c9',
  secretAccessKey: '6674d05d419c70d51624d98a238c306465303d9d7bd735cd6803d76ec172e8ff8254843ca6ace16b144c876aa737ece4',
};
export const videoS3Config = {
  domain: 'newhire-video-source71e471f1-13mh24jfdfdgc.s3.amazonaws.com',
  bucketName: 'newhire-video-source71e471f1-13mh24jfdfdgc',
  path: 'assets01/',
  accessKeyId: 'c7e71b3497b616a31d28a7bc502828b61d7e24e32377795dfa84a545ab70c53a',
  secretAccessKey: 'ffd3da006315ee96efbfa9bd1c08e5503272634a8710a3a3614b087fb4a93cb183452ecbb9b44649c0819ffe94422d42',
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
  console.log('Upload to S3: ', filename, ', bucketName: ', bucketName);
  // Upload the stream
  const s3 = new AWS.S3({
    accessKeyId: decrypt(config.accessKeyId),
    secretAccessKey: decrypt(config.secretAccessKey),
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
