import { Service } from 'egg';
import { EAuth } from './Users';

/**
 * Video Service
 */
export default class Video extends Service {

  /**
   * getVideoList
   */
  public async getVideoById(id: number) {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('select v.name,u.name as uname,v.pic, v.url,f.id as likes from video v left join users u on v.uploader_id = u.id left join favorite f on f.video_id = v.id where v.id = ?', [ id ]);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  public async delVideoById(id: number) {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('delete from video where id = ?', [ id ]);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  public async getVideoList(pageNo: number, userid: number, platform = 'web', size = 10, sort = false) {
    try {
      const app = this.app as any;
      console.log(pageNo, size);
      if (platform !== 'web') {
        const sql = 'select v.id, v.name,u.name as uname,v.pic, v.url, f.user_id as userid, f.id as likes from video v left join favorite f on f.video_id = v.id and f.user_id=? left join users u on v.uploader_id = u.id limit ?,?';
        const res = await app.mysql.query(sql, [ userid, pageNo * size, size ]);
        return res;
      }
      const sql = `select v.id, v.name,u.name as uname,v.pic, v.url, f.user_id as userid, COUNT(DISTINCT(f.id)) as likes from video v left join users u on v.uploader_id = u.id left join favorite f on f.video_id = v.id group by v.id ${sort ? 'order by likes desc' : ''} limit ?,?`;
      const res = await app.mysql.query(sql, [ pageNo * size, size ]);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  public async insert(uploaderId: number, name: string, filehash: string, pic: string) {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('insert into video(uploader_id, name, filehash, pic, upload_date) values(?, ?, ?, ?, now())', [ uploaderId, name, filehash, pic ]);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  public async update(filehash: string, url: string) {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('update video set url=? where filehash=?', [ url, filehash ]);
      console.log(res);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  /*
   * auth method
   */
  public async checkAuth(key: string, body: Record<string, unknown>) {
    const res = await this.service.users.getUserAuthInfo(key);
    console.log(body);
    if (res && res[0]?.name === EAuth.ADMIN) {
      return true;
    }
    return false;
  }
}
