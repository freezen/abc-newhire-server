import { Service } from 'egg';

/**
 * Favorite Service
 */
export default class Favorite extends Service {

  public async like(id: number, videoId: number) {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('insert into favorite(user_id, video_id) values(?, ?)', [ id, videoId ]);
      return res;
    } catch (e) {
      console.error(e);
    }
  }
  public async unlike(id: number, videoId: number) {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('delete from favorite where user_id=? and video_id=?', [ id, videoId ]);
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
    if (Number(res?.[0]?.id ?? -1) === Number(body.id)) {
      return true;
    }
    return false;
  }
}
