import { Controller } from 'egg';
import path from 'path';
import { getHash, picS3Config, upload2S3, videoS3Config } from '../util/util';

export default class VideoController extends Controller {
  public async index() {
    const { ctx } = this;
    const { request } = ctx;
    const { pageNo, platform, userid, pageSize, sort } = request.query;
    const res = await ctx.service.video.getVideoList(Number(pageNo ?? 0), Number(userid), platform, Number(pageSize), sort === '1');
    ctx.body = res;
  }
  public async getVideo() {
    const { ctx } = this;
    const { request } = ctx;
    const { id } = request.query;
    const res = await ctx.service.video.getVideoById(Number(id ?? 0));
    ctx.body = res;
  }
  public async delete() {
    const { ctx } = this;
    const { request } = ctx;
    const { id } = request.body;
    const res = await ctx.service.video.delVideoById(Number(id ?? 0));
    ctx.body = res;
  }

  public async upload() {
    console.log('Start upload...');
    const { ctx } = this;
    const { request } = ctx;
    const { header } = request;
    const key = header.key as any;
    const parts = ctx.multipart();
    let part;
    try {
      // filehash is the VIP key to recoganize the video
      const filehash = getHash(Date.now().toString());
      // handle multipart files
      while ((part = await parts()) != null) {
        console.log('>> while');

        if (part.length) {
          console.log('Read busboy: ' + part[0]);
        } else {
          if (!part.filename) {
            console.warn('No file seleted.');
            return;
          }
          console.log('upload:', part.filename, '-', path.extname(part.filename));
          // if the file part is img, then save to s3 & insert the info to DB
          if (part.mime.includes('image')) {
            // call upload2S3 func to send file to S3, by stream, ${part} is the stream
            const data = await upload2S3(filehash + path.extname(part.filename), part, picS3Config);
            const user = await ctx.service.users.getUserAuthInfo(key) as any;
            if (user && user.length > 0) {
              await ctx.service.video.insert(user[0].id, part.filename.split('.')[0], filehash, data.Location) as any;
            }
          } else {
            // use filehash as file name, then can locate the video by the hash name
            //  when get the callback notification from video-on-demand solution
            await upload2S3(filehash + path.extname(part.filename), part, videoS3Config);
          }
        }
      }
      ctx.body = {
        success: true,
      };
    } catch (e) {
      console.error(e);
      ctx.body = {
        success: false,
      };
    }
  }

  public async uploadCallback() {
    const { ctx } = this;
    const request = ctx.request;
    const body = request.body;
    try {
      const obj = JSON.parse(body);
      console.log('uploadCallback body:', obj);
      const message = obj.Message;
      console.log('uploadCallback message:', message);
      const messageObj = JSON.parse(message);
      const { Outputs } = messageObj;
      console.log('uploadCallback Outputs:', Outputs);

      const reg = /.+\/([0-9a-zA-Z]+)\./;
      const url = Outputs?.HLS_GROUP?.[0] ?? '';
      console.log('url:', url);

      const filehash = reg.exec(url)?.[1];
      console.log('filehash:', filehash);

      if (filehash) {
        console.log('filehash:2', filehash);
        await ctx.service.video.update(filehash, url);
      }
    } catch (e) {
      console.log('UploadCallback Error:', e);
      throw e;
    }
  }
}
