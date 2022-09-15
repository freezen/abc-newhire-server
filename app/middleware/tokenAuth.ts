import { checkToken } from '../util/util';

module.exports = () => {
  return async function tokenAuth(ctx, next) {
    try {
      const { request } = ctx;
      const { header, url } = request;
      if ((!checkToken(header.key, header.token) || !header.token) && url !== '/login' && url !== '/uploadCallback') {
        console.warn('No token auth');
        ctx.body = {
          status: 401,
          message: 'No auth',
        };
      } else {
        await next();
      }
    } catch (e) {
      ctx.body = e;
    }
  };
};
