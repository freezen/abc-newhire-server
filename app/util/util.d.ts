import AWS from 'aws-sdk';
export declare function encrypt(content: any): string;
export declare function decrypt(enc: any): string;
export declare const picS3Config: {
    domain: string;
    bucketName: string;
    accessKeyId: string;
    secretAccessKey: string;
};
export declare const videoS3Config: {
    domain: string;
    bucketName: string;
    path: string;
    accessKeyId: string;
    secretAccessKey: string;
};
export declare const authToken: {};
export declare const getHash: (text: string, hashtype?: string) => string;
export declare const genToken: (name: string, pwd: string) => any;
export declare const checkToken: (key: string, token: string) => boolean;
export declare const upload2S3: (filename: any, stream: any, config: any) => Promise<AWS.S3.ManagedUpload.SendData>;
