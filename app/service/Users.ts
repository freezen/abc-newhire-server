import { Service } from 'egg';
import { getHash } from '../util/util';

export enum EAuth {
  ADMIN = 'admin',
  READ = 'read',
}
/**
 * Users Service
 */
export default class Users extends Service {

  /**
   * getUser
   * @param name - your name
   */
  public async getUserList() {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('select u.id,a.id,u.name,a.name as auth from users u left join auth a on u.auth_id = a.id');
      return res;
    } catch (e) {
      throw e;
    }
  }

  public async getUserAuthInfo(key: string) {
    try {
      const app = this.app as any;
      const res = await app.mysql.query('select u.id,a.name from users u left join auth a on u.auth_id = a.id where u.name=?', [ key ]);
      return res;
    } catch (e) {
      throw e;
    }
  }

  public async login(name: string, hashPwd: string) {
    try {
      const app = this.app as any;
      const pwd = getHash(hashPwd);
      const res = await app.mysql.query('select u.id, a.name  from users u left join auth a on u.auth_id = a.id where u.name = ? and u.pwd = ?', [ name, pwd ]);
      console.log('login servie:', res);
      return res;
    } catch (e) {
      throw e;
    }
  }
}
