import { Controller } from 'egg';
import { genToken } from '../util/util';


export default class AdminController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.users.getUserList();
  }

  public async login() {
    const { ctx } = this;
    const { request } = ctx;
    const { name, pwd } = request.body;
    const res = await ctx.service.users.login(name, pwd) as any;
    if (res && res.length > 0) {
      // console.log('res:', res);
      // generate the token & save in runtime
      const t = genToken(name, pwd);
      const userInfo = {
        token: t,
        key: name,
        id: res[0].id,
        auth: res[0].name,
      };
      ctx.body = {
        ...userInfo,
        success: true,
      };
    } else {
      ctx.body = {
        success: false,
      };
    }
  }
}
